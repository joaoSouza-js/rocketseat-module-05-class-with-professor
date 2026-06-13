import { CurrentUser } from '@/infra/modules/auth/current-use-decorator';
import type { UserJwtPayload } from '@/infra/modules/auth/jwt.strategy';
import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';
import { NestUpdateQuestionUseCase } from '../../use-cases/questions/nest-update-question-use-case';

class UpdateQuestionBody {
    @IsString()
    title!: string;

    @IsString()
    @MaxLength(2400)
    content!: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @Transform(({ value }) => value ?? [])
    attachmentsIds!: string[];
}
class UpdateQuestionParams {
    @IsString()
    questionId!: string;
}


@Controller('/questions/:questionId')
export class UpdateQuestionController {
    constructor(readonly nestUpdateQuestionUseCase: NestUpdateQuestionUseCase) { }

    @Put()
    @HttpCode(204)
    async handler(
        @Param() params: UpdateQuestionParams,
        @Body() body: UpdateQuestionBody,
        @CurrentUser() user: UserJwtPayload,
    ) {
        await this.nestUpdateQuestionUseCase.execute({
            questionId: params.questionId,

            title: body.title,
            content: body.content,
            attachmentsIds: body.attachmentsIds ?? [],
            authorId: user.sub,
        });

    }
}


