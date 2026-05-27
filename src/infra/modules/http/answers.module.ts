import { CreateQuestionController } from "@/infra/http/controllers/questions/create-question.controller";
import { DeleteQuestionController } from "@/infra/http/controllers/questions/delete-question.controller";
import { FetchQuestionController } from "@/infra/http/controllers/questions/fetch-question.controller";
import { FindQuestionBySlugController } from "@/infra/http/controllers/questions/find-question-by-slug";
import { UpdateQuestionController } from "@/infra/http/controllers/questions/update-question.controller";
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