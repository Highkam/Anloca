import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

// Load env file from project root
config({ path: '../../.env' });

//Para levantar el servicio desde services: npm run start:cart

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const config = new DocumentBuilder()
    .setTitle('Cart Service')
    .setDescription('Contratos iniciales del microservicio de carrito de compras')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.CART_PORT || 3002;
  let actualPort = port;
  
  try {
    await app.listen(port);
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.log(`⚠️ Port ${port} is busy, trying alternative port...`);
      await app.listen(0);
      actualPort = app.getHttpServer().address().port;
    } else {
      throw error;
    }
  }

  console.log(`
🚀 Cart Service is running!
📡 Server: http://localhost:${actualPort}
📚 Swagger Docs: http://localhost:${actualPort}/api/docs
  `);
}

bootstrap();
