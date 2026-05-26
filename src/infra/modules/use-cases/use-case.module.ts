import { NestAnswerQuestionUseCase } from "@/infra/http/use-cases/nest-answer-question-use-case";
import { NestAuthenticateStudentUseCase } from "@/infra/http/use-cases/nest-authenticate-student-use-case";
import { NestBestAnswerQuestionUseCase } from "@/infra/http/use-cases/nest-best-answer-question-use-case";
import { NestCreateAnswerCommentUseCase } from "@/infra/http/use-cases/nest-create-answers-commnet-use-case";
import { NestCreateQuestionCommentUseCase } from "@/infra/http/use-cases/nest-create-question-commnet-use-case";
import { NestCreateQuestionUseCase } from "@/infra/http/use-cases/nest-create-question-use-case";
import { NestCreateStudentUseCase } from "@/infra/http/use-cases/nest-create-student-use-case";
import { NestDeleteAnswerQuestionUseCase } from "@/infra/http/use-cases/nest-delete-answer-question-use-case";
import { NestDeleteAnswerCommentUseCase } from "@/infra/http/use-cases/nest-delete-anwers-comment-use-case";
import { NestDeleteQuestionCommentUseCase } from "@/infra/http/use-cases/nest-delete-question-comment-use-case";
import { NestDeleteQuestionUseCase } from "@/infra/http/use-cases/nest-delete-question-use-case";
import { NestFetchAnswerCommentsUseCase } from "@/infra/http/use-cases/nest-fetch-answer-coomment";
import { NestFetchLatestQuestionsUseCase } from "@/infra/http/use-cases/nest-fetch-latest-questions-use-case";
import { NestFetchQuestionCommentsUseCase } from "@/infra/http/use-cases/nest-fetch-question-comments";
import { NestFetchQuestionsAnswersUseCase } from "@/infra/http/use-cases/nest-fetch-questions-answers-use-case";
import { NestFindQuestionBySlugUseCase } from "@/infra/http/use-cases/nest-find-question-by-slug";
import { NestUpdateAnswerQuestionUseCase } from "@/infra/http/use-cases/nest-update-answer-question-use-case";
import { NestUpdateQuestionUseCase } from "@/infra/http/use-cases/nest-update-question-use-case";
import { DatabaseModule } from "@/infra/modules/database/database.module";
import { HasherService } from "@/infra/services/hasher/hasher.service";
import { Module } from "@nestjs/common";
import { CryptographyModule } from "../crypto/crypto.module";

@Module({
    imports: [
        DatabaseModule,
        CryptographyModule
    ],
    providers: [
        HasherService,
        NestFindQuestionBySlugUseCase,
        NestCreateQuestionUseCase,
        NestFetchLatestQuestionsUseCase,
        NestCreateStudentUseCase,
        NestAuthenticateStudentUseCase,
        NestUpdateQuestionUseCase,
        NestDeleteQuestionUseCase,
        NestAnswerQuestionUseCase,
        NestUpdateAnswerQuestionUseCase,
        NestDeleteAnswerQuestionUseCase,
        NestBestAnswerQuestionUseCase,
        NestCreateQuestionCommentUseCase,
        NestDeleteQuestionCommentUseCase,
        NestCreateAnswerCommentUseCase,
        NestDeleteAnswerCommentUseCase,
        NestFetchQuestionsAnswersUseCase,
        NestFetchAnswerCommentsUseCase,
        NestFetchQuestionCommentsUseCase,
    ],
    exports: [
        NestCreateQuestionUseCase,
        NestFetchLatestQuestionsUseCase,
        NestCreateStudentUseCase,
        NestFindQuestionBySlugUseCase,
        NestAuthenticateStudentUseCase,
        NestUpdateQuestionUseCase,
        NestDeleteQuestionUseCase,
        NestAnswerQuestionUseCase,
        NestUpdateAnswerQuestionUseCase,
        NestDeleteAnswerQuestionUseCase,
        NestFetchQuestionsAnswersUseCase,
        NestBestAnswerQuestionUseCase,
        NestCreateQuestionCommentUseCase,
        NestDeleteQuestionCommentUseCase,
        NestCreateAnswerCommentUseCase,
        NestDeleteAnswerCommentUseCase,
        NestFetchQuestionsAnswersUseCase,
        NestFetchAnswerCommentsUseCase,
        NestFetchQuestionCommentsUseCase

    ]
})
export class UseCasesModule { }