import { Module, Global } from '@nestjs/common';
import { RabbitMQConsumer } from './rabbitmq.consumer';

@Global()
@Module({
  providers: [RabbitMQConsumer],
  exports: [RabbitMQConsumer],
})
export class MessagingModule {}
