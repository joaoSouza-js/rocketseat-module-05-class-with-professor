import { AnswerQuestionController } from "@/infra/http/controllers/answers/answer-question.controller";
import { BestAnswerQuestionController } from "@/infra/http/controllers/answers/best-answer-question.controller";
import { DeleteAnswerQuestionController } from "@/infra/http/controllers/answers/delete-answer-question.controller";
import { FetchQuestionAnswersController } from "@/infra/http/controllers/answers/fetch-question-answers.controller";
import { UpdateAnswerQuestionController } from "@/infra/http/controllers/answers/update-answer-question.controller";
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