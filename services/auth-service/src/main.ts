import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Auth Service')
    .setDescription('Microservicio de autenticación')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header',
    }, 'access-token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

   const port = 3001;
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
Auth Service is running!
Server: http://localhost:${actualPort}
Swagger Docs: http://localhost:${actualPort}/api/docs
  `);
}

bootstrap();

