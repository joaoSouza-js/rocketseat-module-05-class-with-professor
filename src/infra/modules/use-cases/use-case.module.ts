import { DatabaseModule } from "@/infra/database/modules/database/database.module";
import { NestCreateQuestionUseCase } from "@/infra/http/use-cases/nest-create-question-use-case";
import { NestFetchLatestQuestionsUseCase } from "@/infra/http/use-cases/nest-fetch-latest-questions-use-case";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        DatabaseModule,
    ],
    providers: [
        NestCreateQuestionUseCase,
        NestFetchLatestQuestionsUseCase
    ],
    exports: [
        NestCreateQuestionUseCase,
        NestFetchLatestQuestionsUseCase
    ]
})
export class UseCasesModule { }