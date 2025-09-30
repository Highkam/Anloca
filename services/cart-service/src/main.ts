import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

//Para levantar el servicio desde services: npm run start:cart

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const config = new DocumentBuilder()
    .setTitle('Cart Service')
    .setDescription('Contratos iniciales del microservicio de carrito de compras')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = 3002;
  await app.listen(port);

  console.log(`🚀 API escuchando en: http://localhost:${port}`);
  console.log(`📄 Documentación Swagger disponible en: http://localhost:${port}/api/docs`);
}
bootstrap();
