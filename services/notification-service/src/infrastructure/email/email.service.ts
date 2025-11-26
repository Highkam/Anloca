import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configurar transporter (puedes usar Gmail, SendGrid, etc.)
    this.logger.log(`📧 SMTP Configuration:`);
    this.logger.log(`   Host: ${process.env.SMTP_HOST || 'smtp.gmail.com'}`);
    this.logger.log(`   Port: ${process.env.SMTP_PORT || '587'}`);
    this.logger.log(`   User: ${process.env.SMTP_USER || 'NOT_SET'}`);
    this.logger.log(`   Pass: ${process.env.SMTP_PASS ? '***SET***' : 'NOT_SET'}`);
    
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      // Si no hay configuración de SMTP, solo loguear (modo desarrollo)
      if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        this.logger.warn('⚠️ SMTP not configured. Email would be sent to:');
        this.logger.log(`📧 To: ${options.to}`);
        this.logger.log(`   Subject: ${options.subject}`);
        this.logger.debug(`   Content: ${options.html}`);
        return;
      }

      this.logger.log(`📤 Attempting to send email to: ${options.to}`);
      this.logger.log(`   From: ${process.env.SMTP_USER}`);
      this.logger.log(`   Subject: ${options.subject}`);
      
      // Enviar email real
      const info = await this.transporter.sendMail({
        from: `"Notification Service" <${process.env.SMTP_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });

      this.logger.log(`✅ Email sent successfully to ${options.to}`);
      this.logger.log(`   Message ID: ${info.messageId}`);
      this.logger.log(`   Response: ${info.response}`);
      this.logger.log(`   Accepted: ${JSON.stringify(info.accepted)}`);
      this.logger.log(`   Rejected: ${JSON.stringify(info.rejected)}`);
    } catch (error: any) {
      this.logger.error(`❌ Failed to send email to ${options.to}`);
      this.logger.error(`   Error: ${error.message}`);
      this.logger.error(`   Code: ${error.code}`);
      this.logger.error(`   Response: ${error.response}`);
      throw error;
    }
  }

  generateProductRemovedEmail(productId: number, cartId: number): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f44336; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .footer { text-align: center; padding: 10px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🗑️ Producto eliminado</h1>
            </div>
            <div class="content">
              <p>Hola,</p>
              <p>Te informamos que se ha eliminado un producto de tu carrito:</p>
              <ul>
                <li><strong>ID del Producto:</strong> ${productId}</li>
                <li><strong>ID del Carrito:</strong> ${cartId}</li>
              </ul>
              <p>Si no reconoces esta acción, por favor contacta con soporte.</p>
            </div>
            <div class="footer">
              <p>Este es un correo automático, por favor no respondas.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}
