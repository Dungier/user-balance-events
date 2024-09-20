import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {INestApplication, ValidationPipe} from '@nestjs/common';

(async () => {
  const PORT: number = Number(process.env.PORT) || 5000;

  const CLIENT_URL: string =
      (process.env.CLIENT_URL as string) || 'http://localhost:5173';

  const app: INestApplication = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  });

  await app.listen(PORT);

  app.useGlobalPipes(new ValidationPipe())
})()