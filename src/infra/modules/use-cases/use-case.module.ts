import { DatabaseModule } from "@/infra/database/modules/database/database.module";
import { NestCreateQuestionUseCase } from "@/infra/http/use-cases/nest-create-question-use-case";
import { NestCreateStudentUseCase } from "@/infra/http/use-cases/nest-create-student-use-case";
import { NestFetchLatestQuestionsUseCase } from "@/infra/http/use-cases/nest-fetch-latest-questions-use-case";
import { HasherService } from "@/services/hasher/hasher.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        DatabaseModule,

    ],
    providers: [
        HasherService,
        NestCreateQuestionUseCase,
        NestFetchLatestQuestionsUseCase,
        NestCreateStudentUseCase
    ],
    exports: [
        NestCreateQuestionUseCase,
        NestFetchLatestQuestionsUseCase,
        NestCreateStudentUseCase
    ]
})
export class UseCasesModule { }