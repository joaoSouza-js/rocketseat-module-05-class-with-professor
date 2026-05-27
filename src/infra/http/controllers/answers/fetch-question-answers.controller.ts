import { Controller, Get, Param } from "@nestjs/common";
import { IsString } from "class-validator";
import { AnswerPresenter } from "../../presenters/answer-presenter";
import { NestFetchQuestionsAnswersUseCase } from "../../use-cases/answers/nest-fetch-questions-answers-use-case";

class FetchQuestionAnswersControllerParams {
    @IsString()
    questionId!: string
}

@Controller('/questions/:questionId/answers')
export class FetchQuestionAnswersController {
    constructor(readonly nestFetchQuestionsAnswersUseCase: NestFetchQuestionsAnswersUseCase) { }

    @Get()
    async handler(@Param() params: FetchQuestionAnswersControllerParams) {
        const response = await this.nestFetchQuestionsAnswersUseCase.execute({
            questionId: params.questionId
        })

        const answersPresenter = response.answers.map(AnswerPresenter.toHTTP)

        return {
            answers: answersPresenter
        }


    }
}