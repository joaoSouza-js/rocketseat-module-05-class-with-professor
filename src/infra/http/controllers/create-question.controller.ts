import { CurrentUser } from '@/infra/modules/auth/current-use-decorator';
import type { UserJwtPayload } from '@/infra/modules/auth/jwt.strategy';
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { IsString, MaxLength } from 'class-validator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
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
    @UseGuards(JwtAuthGuard)
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
