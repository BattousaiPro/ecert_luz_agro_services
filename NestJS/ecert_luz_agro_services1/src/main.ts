import { NestFactory } from '@nestjs/core';
import { ConfigService } from "@nestjs/config";
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix("/api/v1");

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>("PORT");

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(port, () => {
    console.log("[WEB]", " - ", port, config.get<string>("BASE_URL"));
  });
}

bootstrap();

