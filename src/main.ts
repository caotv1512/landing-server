import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.APP_PORT || 3000);
  console.log(
    `app listen on port: http://localhost:${process.env.APP_PORT || 3000}`,
  );
}
bootstrap();
