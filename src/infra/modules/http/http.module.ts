import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { AnswerQuestionController } from '@/infra/http/controllers/answer-question.controller';
import { CreateQuestionController } from '@/infra/http/controllers/create-question.controller';
import { DeleteQuestionController } from '@/infra/http/controllers/delete-question.controller';
import { FetchQuestionController } from '@/infra/http/controllers/fetch-question.controller';
import { FindQuestionBySlugController } from '@/infra/http/controllers/find-question-by-slug';
import { UpdateQuestionController } from '@/infra/http/controllers/update-question.controller';
import { HasherService } from '@/infra/services/hasher/hasher.service';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import { UseCasesModule } from '../use-cases/use-case.module';

@Module({
    controllers: [
        CreateQuestionController,
        FetchQuestionController,
        FindQuestionBySlugController,
        UpdateQuestionController,
        DeleteQuestionController,
        AnswerQuestionController,
    ],
    imports: [
        UseCasesModule,
        AuthModule
    ],
    providers: [HasherService, {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
    }]
})
export class HttpModule { }
