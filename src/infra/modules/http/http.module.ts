import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { AnswerQuestionController } from '@/infra/http/controllers/answer-question.controller';
import { BestAnswerQuestionController } from '@/infra/http/controllers/best-answer-question.controller';
import { CreateAnswerCommentController } from '@/infra/http/controllers/create-answer-comment-controller';
import { CreateQuestionCommentController } from '@/infra/http/controllers/create-question-comment-controller';
import { CreateQuestionController } from '@/infra/http/controllers/create-question.controller';
import { DeleteAnswerCommentController } from '@/infra/http/controllers/delete-answer-comment-controller';
import { DeleteAnswerQuestionController } from '@/infra/http/controllers/delete-answer-question.controller';
import { DeleteQuestionCommentController } from '@/infra/http/controllers/delete-question-comment-controller';
import { DeleteQuestionController } from '@/infra/http/controllers/delete-question.controller';
import { FetchAnswerCommentsController } from '@/infra/http/controllers/fetch-answer-comments.controller';
import { FetchQuestionAnswersController } from '@/infra/http/controllers/fetch-question-answers.controller';
import { FetchQuestionCommentsController } from '@/infra/http/controllers/fetch-question-comments.controller';
import { FetchQuestionController } from '@/infra/http/controllers/fetch-question.controller';
import { FindQuestionBySlugController } from '@/infra/http/controllers/find-question-by-slug';
import { UpdateAnswerQuestionController, } from '@/infra/http/controllers/update-answer-question.controller';
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
        UpdateAnswerQuestionController,
        DeleteAnswerQuestionController,
        FetchQuestionAnswersController,
        BestAnswerQuestionController,
        CreateQuestionCommentController,
        DeleteQuestionCommentController,
        CreateAnswerCommentController,
        DeleteAnswerCommentController,
        FetchQuestionCommentsController,
        FetchAnswerCommentsController,
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
