import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import 'dotenv/config';
import { validate } from './config/config';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateQuestionController } from './controllers/create-question.controller';
import { FetchQuestionController } from './controllers/fetch-question.controller';
import { ApiConfigModule } from './modules/api-config/api-config.module';
import { ApplicationConfigModule } from './modules/application-config/application-config/application-config.module';
import { AuthModule } from './modules/auth/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma/prisma.module';
import { HasherService } from './services/hasher/hasher.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate,
      isGlobal: true
    }),
    PrismaModule,
    ApiConfigModule,
    ApplicationConfigModule,
    AuthModule
  ],
  controllers: [CreateAccountController, CreateQuestionController, FetchQuestionController],
  providers: [HasherService],

})
export class AppModule { } 
