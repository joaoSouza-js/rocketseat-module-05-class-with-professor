import { CurrentUser } from '@/infra/modules/auth/current-use-decorator';
import type { UserJwtPayload } from '@/infra/modules/auth/jwt.strategy';
import { Controller, HttpCode, Param, Patch } from '@nestjs/common';
import { IsString } from 'class-validator';
import { NestBestAnswerQuestionUseCase } from '../../use-cases/answers/nest-best-answer-question-use-case';


class BestAnswerQuestionControllerParams {
    @IsString()
    answerId!: string;
}

@Controller('answers/:answerId/best')
export class BestAnswerQuestionController {
    constructor(readonly nestBestAnswerQuestionUseCase: NestBestAnswerQuestionUseCase) { }

    @Patch()
    @HttpCode(204)
    async handler(
        @Param() params: BestAnswerQuestionControllerParams,
        @CurrentUser() user: UserJwtPayload,
    ) {

        await this.nestBestAnswerQuestionUseCase.execute({
            authorId: user.sub,
            answerId: params.answerId
        })


    }
}
