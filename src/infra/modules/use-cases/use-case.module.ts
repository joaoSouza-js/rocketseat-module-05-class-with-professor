import { DatabaseModule } from "@/infra/database/modules/database/database.module";
import { NestAuthenticateStudentUseCase } from "@/infra/http/use-cases/nest-authenticate-student-use-case";
import { NestCreateQuestionUseCase } from "@/infra/http/use-cases/nest-create-question-use-case";
import { NestCreateStudentUseCase } from "@/infra/http/use-cases/nest-create-student-use-case";
import { NestFetchLatestQuestionsUseCase } from "@/infra/http/use-cases/nest-fetch-latest-questions-use-case";
import { HasherService } from "@/services/hasher/hasher.service";
import { Module } from "@nestjs/common";
import { CryptographyModule } from "../crypto/crypto.module";

@Module({
    imports: [
        DatabaseModule,
        CryptographyModule
    ],
    providers: [
        HasherService,

        NestCreateQuestionUseCase,
        NestFetchLatestQuestionsUseCase,
        NestCreateStudentUseCase,
        NestAuthenticateStudentUseCase,
    ],
    exports: [
        NestCreateQuestionUseCase,
        NestFetchLatestQuestionsUseCase,
        NestCreateStudentUseCase,
        NestAuthenticateStudentUseCase
    ]
})
export class UseCasesModule { }