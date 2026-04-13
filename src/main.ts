
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/filters/prisma-exception-filter';
import { ApiConfigService } from './services/api-config/api-config.service';


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
