import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import 'dotenv/config';
import { validate } from '../config/config';
import { PrismaModule } from './database/modules/prisma/prisma.module';
import { ApiConfigModule } from './modules/api-config/api-config.module';
import { HttpModule } from './modules/http/http.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate,
      isGlobal: true
    }),

    ApiConfigModule,
    HttpModule,
    PrismaModule,
  ],

})
export class AppModule { } 
