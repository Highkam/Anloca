import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import amqp, { Connection, Channel, ConsumeMessage } from "amqplib";

@Injectable()
export class RabbitMQConsumer implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitMQConsumer.name);

  private connection: Connection | null = null;
  private channel: Channel | null = null;

  private readonly rabbitUrl =
    process.env.RABBITMQ_URL || "amqp://guest:guest@rabbitmq:5672";

  private queue: string = "";

  private isConnecting = false;

  constructor(
    @InjectQueue('notifications') private notificationQueue: Queue,
  ) {}

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

      // Usar el mismo exchange que cart-service
      await this.channel.assertExchange('events', 'topic', { durable: true });
      
      // Crear una cola durable para persistir eventos
      const q = await this.channel.assertQueue('notification-service-queue', { 
        durable: true,
        autoDelete: false 
      });
      
      // Suscribirse a los eventos específicos
      await this.channel.bindQueue(q.queue, 'events', 'ProductRemovedFromCart');
      await this.channel.bindQueue(q.queue, 'events', 'BundleCreated');
      
      // Guardar el nombre de la cola para consumir
      this.queue = q.queue;

      this.logger.log(`✅ Connected to RabbitMQ → Exchange: events`);
      this.logger.log(`✅ Subscribed to: ProductRemovedFromCart, BundleCreated`);

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

    this.logger.log(`👂 Listening for messages on exchange 'events'...`);

    await this.channel.consume(
      this.queue,
      async (msg: ConsumeMessage | null) => {
        if (!msg) return;

        try {
          const raw = msg.content.toString();
          const data = JSON.parse(raw);
          const eventType = msg.fields.routingKey; // El eventType viene en el routingKey

          this.logger.log(`📨 Event received → ${eventType}`);

          await this.routeEvent(eventType, data);

          this.channel!.ack(msg);
        } catch (err: any) {
          this.logger.error(`❌ Error processing message: ${err.message}`);
          this.channel!.nack(msg, false, true);
        }
      },
      { noAck: false }
    );
  }

  private async routeEvent(eventType: string, data: any) {
    // En lugar de procesar directamente, añadir a la cola de BullMQ
    switch (eventType) {
      case "ProductRemovedFromCart":
        await this.notificationQueue.add('product-removed', data, {
          attempts: 3,
          backoff: { type: 'exponential', delay: 2000 },
        });
        this.logger.log(`✅ Event queued: ProductRemovedFromCart`);
        break;

      case "BundleCreated":
        await this.notificationQueue.add('bundle-created', data, {
          attempts: 3,
          backoff: { type: 'exponential', delay: 2000 },
        });
        this.logger.log(`✅ Event queued: BundleCreated`);
        break;

      default:
        this.logger.warn(`⚠️ Unknown event: ${eventType}`);
    }
  }

  // Estos métodos ya no se usan directamente, los procesa el Worker
  async handleProductRemoved(data: any) {
    this.logger.log(
      `🗑️ Product ${data.productId} removed from cart ${data.cartId} by user ${data.userId}`
    );
  }

  async handleBundleCreated(data: any) {
    this.logger.log(
      `� Bundle ${data.bundleId} created for user ${data.userId}`
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
