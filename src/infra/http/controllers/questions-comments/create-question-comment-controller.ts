import { CurrentUser } from '@/infra/modules/auth/current-use-decorator';
import type { UserJwtPayload } from '@/infra/modules/auth/jwt.strategy';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { IsString } from 'class-validator';
import { CommentPresenter } from '../../presenters/comment-presenter';
import { NestCreateQuestionCommentUseCase } from '../../use-cases/nest-create-question-commnet-use-case';

class CreateQuestionCommentControllerBody {
    @IsString()
    content!: string;
}

class CreateQuestionCommentControllerParams {
    @IsString()
    questionId!: string;
}

@Controller('/questions/:questionId/comments')
export class CreateQuestionCommentController {
    constructor(
        readonly nestCreateQuestionCommentUseCase: NestCreateQuestionCommentUseCase,
    ) { }

    @Post()
    @HttpCode(201)
    async handler(
        @Param() params: CreateQuestionCommentControllerParams,
        @Body() body: CreateQuestionCommentControllerBody,
        @CurrentUser() user: UserJwtPayload,
    ) {
        const response = await this.nestCreateQuestionCommentUseCase.execute({
            questionId: params.questionId,
            authorId: user.sub,
            content: body.content,
        });

        const commentPresenter = CommentPresenter.toHTTP(response.comment);

        return {
            comment: commentPresenter,
        }
    }
}
