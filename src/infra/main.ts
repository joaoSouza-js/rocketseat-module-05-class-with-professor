
import { ApiConfigService } from '@/services/api-config/api-config.service';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './http/filters/prisma-exception-filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true
  }))
  app.useGlobalFilters(new PrismaExceptionFilter())

  await app.listen(app.get(ApiConfigService).port);
}
bootstrap().catch(console.error);
