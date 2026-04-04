import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import 'dotenv/config';
import { validate } from './config/config';
import { CreateAccountController } from './controllers/create-account-controller';
import { ApiConfigService } from './services/api-config/api-config.service';
import { HasherService } from './services/hasher/hasher.service';
import { PrismaService } from './services/prisma/prisma.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate,
    }),
  ],
  controllers: [CreateAccountController],
  providers: [PrismaService, HasherService, ApiConfigService],
})
export class AppModule { }
