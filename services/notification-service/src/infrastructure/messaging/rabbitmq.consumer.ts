import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import amqp, { Connection, Channel, ConsumeMessage } from "amqplib";

@Injectable()
export class RabbitMQConsumer implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitMQConsumer.name);

  private connection: Connection | null = null;
  private channel: Channel | null = null;

  private readonly rabbitUrl =
    process.env.RABBITMQ_URL || "amqp://guest:guest@rabbitmq:5672";

  private readonly queue =
    process.env.NOTIFICATION_QUEUE || "notification-events";

  private isConnecting = false;

  async onModuleInit() {
    this.logger.log("🔄 Initializing RabbitMQ consumer...");
    await this.initConnection();
  }

  private async initConnection() {
    if (this.isConnecting) return;
    this.isConnecting = true;

    try {
      this.connection = await amqp.connect(this.rabbitUrl);
      this.channel = await this.connection.createChannel();

      await this.channel.assertQueue(this.queue, { durable: true });

      this.logger.log(`✅ Connected to RabbitMQ → Queue: ${this.queue}`);

      // Auto-reconnect handlers
      this.connection.on("close", () => {
        this.logger.warn("⚠️ RabbitMQ connection closed. Reconnecting...");
        setTimeout(() => this.initConnection(), 5000);
      });

      this.connection.on("error", (err) => {
        this.logger.error("❌ RabbitMQ error:", err);
      });

      await this.startConsumer();
    } catch (err: any) {
      this.logger.error(`❌ RabbitMQ connection failed: ${err.message}`);
      setTimeout(() => this.initConnection(), 5000);
    }

    this.isConnecting = false;
  }

  private async startConsumer() {
    if (!this.channel) return;

    this.logger.log(`👂 Listening for messages on '${this.queue}'...`);

    await this.channel.consume(
      this.queue,
      async (msg: ConsumeMessage | null) => {
        if (!msg) return;

        try {
          const raw = msg.content.toString();
          const event = JSON.parse(raw);

          this.logger.log(`📨 Event received → ${event.eventType}`);

          await this.routeEvent(event);

          this.channel!.ack(msg);
        } catch (err: any) {
          this.logger.error(`❌ Error processing message: ${err.message}`);
          this.channel!.nack(msg, false, true);
        }
      },
      { noAck: false }
    );
  }

  private async routeEvent(event: any) {
    switch (event.eventType) {
      case "ProductRemovedFromCart":
        return this.handleProductRemoved(event.data);

      case "CartCreated":
        return this.handleCartCreated(event.data);

      default:
        this.logger.warn(`⚠️ Unknown event: ${event.eventType}`);
    }
  }

  async handleProductRemoved(data: any) {
    this.logger.log(
      `🗑️ Product ${data.productId} removed from cart ${data.cartId} by user ${data.userId}`
    );
  }

  async handleCartCreated(data: any) {
    this.logger.log(
      `🛒 New cart created for user ${data.userId} (cart: ${data.cartId})`
    );
  }

  async onModuleDestroy() {
    this.logger.log("🔌 Closing RabbitMQ connection...");
    try {
      await this.channel?.close();
      await this.connection?.close();
    } catch {}
  }
}
