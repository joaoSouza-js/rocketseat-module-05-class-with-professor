import { CurrentUser } from '@/infra/modules/auth/current-use-decorator';
import type { UserJwtPayload } from '@/infra/modules/auth/jwt.strategy';
import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common';
import { IsString } from 'class-validator';
import { NestUpdateAnswerQuestionUseCase } from '../../use-cases/nest-update-answer-question-use-case';

class UpdateAnswerQuestionControllerBody {
    @IsString()
    content!: string;
}

class UpdateAnswerQuestionControllerParams {
    @IsString()
    answerId!: string;
}

@Controller('/answers/:answerId')
export class UpdateAnswerQuestionController {
    constructor(readonly newtUpdateAnswerQuestionUseCase: NestUpdateAnswerQuestionUseCase) { }

    @Put()
    @HttpCode(204)
    async handler(
        @Param() params: UpdateAnswerQuestionControllerParams,
        @Body() body: UpdateAnswerQuestionControllerBody,
        @CurrentUser() user: UserJwtPayload,
    ) {

        await this.newtUpdateAnswerQuestionUseCase.execute({
            answerId: params.answerId,
            authorId: user.sub,
            content: body.content

        })


    }
}
