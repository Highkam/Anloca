import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

//Para ver la documentacion, correr el servicio y entrar a http://localhost:3002/api/docs
//Para levantar el servicio: npm run start:cart

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cart Service')
    .setDescription('Contratos iniciales del microservicio de carrito de compras')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3002);
}
bootstrap();
