import { CurrentUser } from '@/infra/modules/auth/current-use-decorator';
import type { UserJwtPayload } from '@/infra/modules/auth/jwt.strategy';
import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { IsString } from 'class-validator';
import { NestDeleteAnswerQuestionUseCase } from '../../use-cases/nest-delete-answer-question-use-case';


class DeleteAnswerQuestionControllerParams {
    @IsString()
    answerId!: string;
}

@Controller('/answers/:answerId')
export class DeleteAnswerQuestionController {
    constructor(readonly nestDeleteAnswerQuestionUseCase: NestDeleteAnswerQuestionUseCase) { }

    @Delete()
    @HttpCode(204)
    async handler(
        @Param() params: DeleteAnswerQuestionControllerParams,
        @CurrentUser() user: UserJwtPayload,
    ) {

        await this.nestDeleteAnswerQuestionUseCase.execute({
            answerId: params.answerId,
            authorId: user.sub,

        })


    }
}
