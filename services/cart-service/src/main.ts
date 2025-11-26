import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

// Load env file from project root
config({ path: '../../.env' });



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Cart Service')
    .setDescription('Microservicio de carrito de compras')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = 3002;
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
Cart Service is running!
Server: http://localhost:${actualPort}
Swagger Docs: http://localhost:${actualPort}/api/docs
  `);
}

bootstrap();
