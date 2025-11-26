import * as amqp from 'amqplib';
import { IEventBus } from '../../interface/event-bus.interface';

export class EventBusService implements IEventBus {
  private connection;
  private channel;

  async connect() {
    this.connection = await amqp.connect('amqp://rabbitmq');
    this.channel = await this.connection.createChannel();
  }

  async publish(eventType: string, data: any) {
    await this.channel.assertExchange('events', 'topic', { durable: false });
    this.channel.publish('events', eventType, Buffer.from(JSON.stringify(data)));
  }

  async subscribe(eventType: string, handler: (data: any) => void) {
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