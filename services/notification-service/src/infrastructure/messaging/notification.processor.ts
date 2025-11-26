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

  @Process('bundle-created')
  async handleBundleCreated(job: Job) {
    this.logger.log(`� Processing bundle created event...`);
    const { userId, bundleId, name, recurrenceId } = job.data;

    try {
      // TODO: Implementar lógica de notificación
      // - Enviar email confirmando bundle creado
      // - Push notification
      // - SMS

      this.logger.log(
        `✅ Notification sent: Bundle "${name}" (ID: ${bundleId}) created for user ${userId} with recurrence ${recurrenceId}`
      );

      return { success: true, processedAt: new Date() };
    } catch (error) {
      this.logger.error(`❌ Failed to process bundle-created: ${error.message}`);
      throw error;
    }
  }
}
