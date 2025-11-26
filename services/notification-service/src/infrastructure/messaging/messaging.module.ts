import { Module, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { RabbitMQConsumer } from './rabbitmq.consumer';
import { NotificationProcessor } from './notification.processor';

@Global()
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    BullModule.registerQueue({
      name: 'notifications',
    }),
  ],
  providers: [RabbitMQConsumer, NotificationProcessor],
  exports: [RabbitMQConsumer, BullModule],
})
export class MessagingModule {}
