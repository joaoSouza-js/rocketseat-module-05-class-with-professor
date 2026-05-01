import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import 'dotenv/config';
import { validate } from '../config/config';
import { ApiConfigModule } from '../modules/api-config/api-config.module';
import { ApplicationConfigModule } from '../modules/application-config/application-config/application-config.module';
import { PrismaModule } from './database/modules/prisma/prisma.module';
import { HttpModule } from './modules/http/http.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate,
      isGlobal: true
    }),

    ApiConfigModule,
    ApplicationConfigModule,
    HttpModule,
    PrismaModule,
  ],

})
export class AppModule { } 
