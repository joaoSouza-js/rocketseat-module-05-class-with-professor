import { CurrentUser } from '@/infra/modules/auth/current-use-decorator';
import type { UserJwtPayload } from '@/infra/modules/auth/jwt.strategy';
import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { IsString } from 'class-validator';
import { CommentPresenter } from '../../presenters/comment-presenter';
import { NestDeleteQuestionCommentUseCase } from '../../use-cases/questions-comments/nest-delete-question-comment-use-case';


class DeleteQuestionCommentControllerParams {
    @IsString()
    commentId!: string;
}

@Controller('comments/:commentId/questions')
export class DeleteQuestionCommentController {
    constructor(
        readonly nestDeleteQuestionCommentUseCase: NestDeleteQuestionCommentUseCase,
    ) { }

    @Delete()
    @HttpCode(204)
    async handler(
        @Param() params: DeleteQuestionCommentControllerParams,
        @CurrentUser() user: UserJwtPayload,
    ) {
        const response = await this.nestDeleteQuestionCommentUseCase.execute({
            authorId: user.sub,
            questionCommentId: params.commentId
        });

        const commentPresenter = CommentPresenter.toHTTP(response.comment);

        return {
            comment: commentPresenter,
        }
    }
}
