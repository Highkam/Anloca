import { Module, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { RabbitMQConsumer } from './rabbitmq.consumer';
import { NotificationProcessor } from './notification.processor';
import { AuthService } from '../http/auth.service';
import { EmailService } from '../email/email.service';

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
  providers: [RabbitMQConsumer, NotificationProcessor, AuthService, EmailService],
  exports: [RabbitMQConsumer, BullModule],
})
export class MessagingModule {}
