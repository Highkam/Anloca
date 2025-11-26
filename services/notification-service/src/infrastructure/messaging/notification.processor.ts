import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('notifications')
export class NotificationProcessor {
  private readonly logger = new Logger(NotificationProcessor.name);

  @Process('product-removed')
  async handleProductRemoved(job: Job) {
    this.logger.log(`🗑️ Processing product removed event...`);
    const { productId, cartId, userId, removedAt } = job.data;

    try {
      // TODO: Implementar lógica de notificación
      // - Enviar email
      // - Push notification
      // - SMS
      // - Guardar en BD

      this.logger.log(
        `✅ Notification sent: Product ${productId} removed from cart ${cartId} for user ${userId} at ${removedAt}`
      );

      return { success: true, processedAt: new Date() };
    } catch (error) {
      this.logger.error(`❌ Failed to process product-removed: ${error.message}`);
      throw error; // BullMQ will retry based on job options
    }
  }

  @Process('cart-created')
  async handleCartCreated(job: Job) {
    this.logger.log(`🛒 Processing cart created event...`);
    const { userId, cartId } = job.data;

    try {
      // TODO: Implementar lógica de notificación
      this.logger.log(
        `✅ Notification sent: Cart ${cartId} created for user ${userId}`
      );

      return { success: true, processedAt: new Date() };
    } catch (error) {
      this.logger.error(`❌ Failed to process cart-created: ${error.message}`);
      throw error;
    }
  }
}
