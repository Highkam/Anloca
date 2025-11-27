import * as amqp from 'amqplib';
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';

@Injectable()
export class EventBusService implements OnModuleInit {
  private readonly logger = new Logger(EventBusService.name);
  private connection;
  private channel;

  async onModuleInit() {
    await this.connect();
  }

  async connect(retries = 5, delayMs = 3000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        this.logger.log(`🔄 Connecting to RabbitMQ (attempt ${attempt}/${retries})...`);
        this.connection = await amqp.connect('amqp://rabbitmq');
        this.channel = await this.connection.createChannel();
        
        // Configurar el exchange como durable
        await this.channel.assertExchange('events', 'topic', { durable: true });
        
        // Auto-reconexión en caso de cierre
        this.connection.on('close', () => {
          this.logger.warn('⚠️ RabbitMQ connection closed. Reconnecting...');
          setTimeout(() => this.connect(), 5000);
        });

        this.connection.on('error', (err) => {
          this.logger.error('❌ RabbitMQ error:', err);
        });

        this.logger.log('✅ Connected to RabbitMQ successfully');
        return;
      } catch (err) {
        this.logger.error(`❌ Failed to connect to RabbitMQ: ${err.message}`);
        if (attempt === retries) throw err;
        await new Promise(res => setTimeout(res, delayMs));
      }
    }
  }

  async publish(eventType: string, data: any) {
    try {
      if (!this.channel) {
        this.logger.warn('⚠️ Channel not ready, reconnecting...');
        await this.connect();
      }
      
      // Publicar con persistencia
      const published = this.channel.publish(
        'events', 
        eventType, 
        Buffer.from(JSON.stringify(data)),
        { persistent: true }
      );

      if (!published) {
        this.logger.warn(`⚠️ Message buffered (channel full): ${eventType}`);
      } else {
        this.logger.log(`📤 Event published: ${eventType}`);
      }
    } catch (error) {
      this.logger.error(`❌ Failed to publish event ${eventType}:`, error);
      throw error;
    }
  }
}
