import { CreateQuestionController } from "@/infra/http/controllers/create-question.controller";
import { DeleteQuestionController } from "@/infra/http/controllers/delete-question.controller";
import { FetchQuestionController } from "@/infra/http/controllers/fetch-question.controller";
import { FindQuestionBySlugController } from "@/infra/http/controllers/find-question-by-slug";
import { UpdateQuestionController } from "@/infra/http/controllers/update-question.controller";
import { Module } from "@nestjs/common";
import { UseCasesModule } from "../use-cases/use-case.module";

@Module({
    imports: [UseCasesModule],
    controllers: [
        CreateQuestionController,
        FetchQuestionController,
        FindQuestionBySlugController,
        UpdateQuestionController,
        DeleteQuestionController,
    ]
})
export class QuestionsModule { }