import { CurrentUser } from '@/infra/modules/auth/current-use-decorator';
import type { UserJwtPayload } from '@/infra/modules/auth/jwt.strategy';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { IsString } from 'class-validator';
import { AnswerPresenter } from '../presenters/answer-presenter';
import { NestAnswerQuestionUseCase } from '../use-cases/nest-answer-question-use-case';

class AnswerQuestionControllerBody {
    @IsString()
    content!: string;
}

class AnswerQuestionControllerParams {
    @IsString()
    questionId!: string;
}

@Controller('/questions/:questionId/answers')
export class AnswerQuestionController {
    constructor(readonly nestAnswerQuestionUseCase: NestAnswerQuestionUseCase) { }

    @Post()
    @HttpCode(201)
    async handler(
        @Param() params: AnswerQuestionControllerParams,
        @Body() body: AnswerQuestionControllerBody,
        @CurrentUser() user: UserJwtPayload,
    ) {

        const answer = await this.nestAnswerQuestionUseCase.execute({
            authorId: user.sub,
            questionId: params.questionId,
            content: body.content,
            attachmentsIds: []
        })

        const answerPresenter = AnswerPresenter.toHTTP(answer)

        return {
            answer: answerPresenter
        }
    }
}
