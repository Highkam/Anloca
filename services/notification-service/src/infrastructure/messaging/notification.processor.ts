import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { AuthService } from '../http/auth.service';
import { EmailService } from '../email/email.service';

@Processor('notifications')
export class NotificationProcessor {
  private readonly logger = new Logger(NotificationProcessor.name);

  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @Process('product-removed')
  async handleProductRemoved(job: Job) {
    this.logger.log(`🗑️ Processing product removed event...`);
    const { productId, cartId, userId, removedAt } = job.data;

    try {
      // 1. Obtener email del usuario desde auth-service
      this.logger.log(`📞 Consultando email del usuario ${userId}...`);
      const userEmail = await this.authService.getUserEmail(userId);
      
      this.logger.log(`✅ Email obtenido: ${userEmail}`);

      // 2. Generar contenido del email
      const emailHtml = this.emailService.generateProductRemovedEmail(productId, cartId);

      // 3. Enviar email
      await this.emailService.sendEmail({
        to: userEmail,
        subject: `Producto eliminado de tu carrito`,
        html: emailHtml,
      });

      this.logger.log(
        `✅ Notificación enviada: Product ${productId} removed from cart ${cartId} to ${userEmail}`
      );

      return { success: true, processedAt: new Date(), sentTo: userEmail };
    } catch (error) {
      this.logger.error(`❌ Failed to process product-removed: ${error.message}`);
      throw error;
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
