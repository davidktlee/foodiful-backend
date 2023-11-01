import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('foodiful API')
    .setDescription('foodiful web/app API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://ec2-13-125-253-140.ap-northeast-2.compute.amazonaws.com/',
    ],
    credentials: true,
  });

  app.use(cookieParser());
  await app.listen(5002);
  console.log('app is listening');
}

bootstrap();
