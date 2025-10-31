import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './infraestructure/common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  
  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Catalog Service API - Clean Architecture')
    .setDescription('Microservicio de catálogo con arquitectura limpia')
    .setVersion('1.0')
    .addTag('products')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Global Pipes and Filters
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.useGlobalFilters(new HttpExceptionFilter());

  const port = 3000;
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
🚀 Catalog Service is running!
📡 Server: http://localhost:${actualPort}
📚 Swagger Docs: http://localhost:${actualPort}/api/docs
  `);
}
bootstrap();