import * as amqp from 'amqplib';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { IEventBus } from '../../interface/event-bus.interface';

@Injectable()
export class EventBusService implements IEventBus, OnModuleInit {
  private connection;
  private channel;

  async onModuleInit() {
    await this.connect();
  }

  async connect(retries = 5, delayMs = 3000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        this.connection = await amqp.connect('amqp://rabbitmq');
        this.channel = await this.connection.createChannel();
        return;
      } catch (err) {
        if (attempt === retries) throw err;
        await new Promise(res => setTimeout(res, delayMs));
      }
    }
  }

  async publish(eventType: string, data: any) {
    if (!this.channel) {
      await this.connect();
    }
    await this.channel.assertExchange('events', 'topic', { durable: false });
    this.channel.publish('events', eventType, Buffer.from(JSON.stringify(data)));
  }

  async subscribe(eventType: string, handler: (data: any) => void) {
    if (!this.channel) {
      await this.connect();
    }
    await this.channel.assertExchange('events', 'topic', { durable: false });
    const q = await this.channel.assertQueue('', { exclusive: true });
    this.channel.bindQueue(q.queue, 'events', eventType);
    this.channel.consume(q.queue, (msg) => {
      if (msg) {
        handler(JSON.parse(msg.content.toString()));
      }
    }, { noAck: true });
  }
}