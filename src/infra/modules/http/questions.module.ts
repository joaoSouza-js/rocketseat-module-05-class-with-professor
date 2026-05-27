import { AnswerQuestionController } from "@/infra/http/controllers/answer-question.controller";
import { BestAnswerQuestionController } from "@/infra/http/controllers/best-answer-question.controller";
import { DeleteAnswerQuestionController } from "@/infra/http/controllers/delete-answer-question.controller";
import { FetchQuestionAnswersController } from "@/infra/http/controllers/fetch-question-answers.controller";
import { UpdateAnswerQuestionController } from "@/infra/http/controllers/update-answer-question.controller";
import { Module } from "@nestjs/common";
import { UseCasesModule } from "../use-cases/use-case.module";

@Module({
    imports: [UseCasesModule],
    controllers: [
        AnswerQuestionController,
        UpdateAnswerQuestionController,
        DeleteAnswerQuestionController,
        FetchQuestionAnswersController,
        BestAnswerQuestionController,
    ],
})
export class AnswersModule { }