import { CurrentUser } from '@/infra/modules/auth/current-use-decorator';
import type { UserJwtPayload } from '@/infra/modules/auth/jwt.strategy';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { IsString, MaxLength } from 'class-validator';
import { NestCreateQuestionUseCase } from '../use-cases/nest-create-question-use-case';

export class CreteQuestionBody {
    @IsString()
    title!: string

    @IsString()
    @MaxLength(2400)
    content!: string

}

@Controller('/questions')
export class CreateQuestionController {
    constructor(
        readonly nestCreateQuestionUseCase: NestCreateQuestionUseCase,
    ) { }

    @Post()
    @HttpCode(201)

    async handler(
        @Body() body: CreteQuestionBody,
        @CurrentUser() user: UserJwtPayload,
    ) {



        const response = await this.nestCreateQuestionUseCase.execute({
            title: body.title,
            content: body.content,
            authorId: user.sub,
            attachmentsIds: []
        })

        return {
            slug: response.question.slug.value
        }
    }
}
