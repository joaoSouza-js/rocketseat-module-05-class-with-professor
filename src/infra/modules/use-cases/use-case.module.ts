import { NestAuthenticateStudentUseCase } from "@/infra/http/use-cases/nest-authenticate-student-use-case";
import { NestCreateQuestionUseCase } from "@/infra/http/use-cases/nest-create-question-use-case";
import { NestCreateStudentUseCase } from "@/infra/http/use-cases/nest-create-student-use-case";
import { NestFetchLatestQuestionsUseCase } from "@/infra/http/use-cases/nest-fetch-latest-questions-use-case";
import { NestFindQuestionBySlugUseCase } from "@/infra/http/use-cases/nest-find-question-by-slug";
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
    ],
    exports: [
        NestCreateQuestionUseCase,
        NestFetchLatestQuestionsUseCase,
        NestCreateStudentUseCase,
        NestFindQuestionBySlugUseCase,
        NestAuthenticateStudentUseCase
    ]
})
export class UseCasesModule { }