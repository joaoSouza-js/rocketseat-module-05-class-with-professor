import { NestCreateAnswerCommentUseCase } from "@/infra/http/use-cases/answers-comments/nest-create-answers-commnet-use-case";
import { NestDeleteAnswerCommentUseCase } from "@/infra/http/use-cases/answers-comments/nest-delete-anwers-comment-use-case";
import { NestFetchAnswerCommentsUseCase } from "@/infra/http/use-cases/answers-comments/nest-fetch-answer-coomment";
import { NestAnswerQuestionUseCase } from "@/infra/http/use-cases/answers/nest-answer-question-use-case";
import { NestBestAnswerQuestionUseCase } from "@/infra/http/use-cases/answers/nest-best-answer-question-use-case";
import { NestDeleteAnswerQuestionUseCase } from "@/infra/http/use-cases/answers/nest-delete-answer-question-use-case";
import { NestFetchQuestionsAnswersUseCase } from "@/infra/http/use-cases/answers/nest-fetch-questions-answers-use-case";
import { NestUpdateAnswerQuestionUseCase } from "@/infra/http/use-cases/answers/nest-update-answer-question-use-case";
import { NestAuthenticateStudentUseCase } from "@/infra/http/use-cases/nest-authenticate-student-use-case";
import { NestCreateStudentUseCase } from "@/infra/http/use-cases/nest-create-student-use-case";
import { NestCreateQuestionCommentUseCase } from "@/infra/http/use-cases/questions-comments/nest-create-question-commnet-use-case";
import { NestDeleteQuestionCommentUseCase } from "@/infra/http/use-cases/questions-comments/nest-delete-question-comment-use-case";
import { NestFetchQuestionCommentsUseCase } from "@/infra/http/use-cases/questions-comments/nest-fetch-question-comments";
import { NestCreateQuestionUseCase } from "@/infra/http/use-cases/questions/nest-create-question-use-case";
import { NestDeleteQuestionUseCase } from "@/infra/http/use-cases/questions/nest-delete-question-use-case";
import { NestFetchLatestQuestionsUseCase } from "@/infra/http/use-cases/questions/nest-fetch-latest-questions-use-case";
import { NestFindQuestionBySlugUseCase } from "@/infra/http/use-cases/questions/nest-find-question-by-slug";
import { NestUpdateQuestionUseCase } from "@/infra/http/use-cases/questions/nest-update-question-use-case";
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