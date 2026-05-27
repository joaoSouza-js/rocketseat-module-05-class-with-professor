import { CurrentUser } from '@/infra/modules/auth/current-use-decorator';
import type { UserJwtPayload } from '@/infra/modules/auth/jwt.strategy';
import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { IsString } from 'class-validator';
import { NestDeleteQuestionUseCase } from '../../use-cases/nest-delete-question-use-case';


class DeleteQuestionParams {
    @IsString()
    questionId!: string
}

@Controller('/questions/:questionId')
export class DeleteQuestionController {
    constructor(
        readonly nestDeleteQuestionUseCase: NestDeleteQuestionUseCase,
    ) { }

    @Delete()
    @HttpCode(204)

    async handler(
        @Param() params: DeleteQuestionParams,
        @CurrentUser() user: UserJwtPayload,
    ) {

        await this.nestDeleteQuestionUseCase.execute({
            authorId: user.sub,
            questionId: params.questionId
        })


    }
}
