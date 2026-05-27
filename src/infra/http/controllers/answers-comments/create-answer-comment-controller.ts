import { CurrentUser } from '@/infra/modules/auth/current-use-decorator';
import type { UserJwtPayload } from '@/infra/modules/auth/jwt.strategy';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { IsString } from 'class-validator';
import { AnswerCommentPresenter } from '../../presenters/anwers-comment-presenter';
import { NestCreateAnswerCommentUseCase } from '../../use-cases/nest-create-answers-commnet-use-case';

class CreateAnswerCommentControllerBody {
    @IsString()
    content!: string;
}

class CreateAnswerCommentControllerParams {
    @IsString()
    answerId!: string;
}

@Controller('/answers/:answerId/comments')
export class CreateAnswerCommentController {
    constructor(
        readonly nestCreateAnswerCommentUseCase: NestCreateAnswerCommentUseCase,
    ) { }

    @Post()
    @HttpCode(201)
    async handler(
        @Param() params: CreateAnswerCommentControllerParams,
        @Body() body: CreateAnswerCommentControllerBody,
        @CurrentUser() user: UserJwtPayload,
    ) {
        const response = await this.nestCreateAnswerCommentUseCase.execute({
            answerId: params.answerId,
            authorId: user.sub,
            content: body.content,
        });

        const commentPresenter = AnswerCommentPresenter.toHTTP(response.comment);

        return {
            comment: commentPresenter,
        }
    }
}
