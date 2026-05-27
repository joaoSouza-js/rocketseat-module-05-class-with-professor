import { Controller, Get, Param } from "@nestjs/common";
import { IsString } from "class-validator";
import { QuestionPresenter, QuestionPresenterResponse } from "../../presenters/question-presenter";
import { NestFindQuestionBySlugUseCase } from "../../use-cases/nest-find-question-by-slug";

class FindQuestionBySlugControllerParams {
    @IsString()
    slug!: string
}

@Controller('/questions/:slug')
export class FindQuestionBySlugController {
    constructor(
        readonly nestFindQuestionBySlugUseCase: NestFindQuestionBySlugUseCase
    ) { }

    @Get()

    async handler(@Param() params: FindQuestionBySlugControllerParams): Promise<QuestionPresenterResponse> {
        const question = await this.nestFindQuestionBySlugUseCase.execute({ slug: params.slug })
        const questionPresenter = QuestionPresenter.toHTTP(question.question)
        return questionPresenter
    }
}