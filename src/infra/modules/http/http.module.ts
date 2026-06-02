import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { AttachmentsUploadController } from '@/infra/http/controllers/upload-attachments.controller';
import { HasherService } from '@/infra/services/hasher/hasher.service';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import { AnswersCommentsModule } from './answers-comments.module';
import { QuestionsModule } from './answers.module';
import { QuestionsCommentsModule } from './questions-comments.module';
import { AnswersModule } from './questions.module';

@Module({

    imports: [
        AnswersModule,
        QuestionsModule,
        QuestionsCommentsModule,
        AnswersCommentsModule,
        AuthModule,

    ],
    controllers: [AttachmentsUploadController],
    providers: [HasherService, {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
    }]
})
export class HttpModule { }
