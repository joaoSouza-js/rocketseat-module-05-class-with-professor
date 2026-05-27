import { CurrentUser } from '@/infra/modules/auth/current-use-decorator';
import type { UserJwtPayload } from '@/infra/modules/auth/jwt.strategy';
import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { IsString } from 'class-validator';
import { NestDeleteAnswerCommentUseCase } from '../../use-cases/answers-comments/nest-delete-anwers-comment-use-case';


class DeleteAnswerCommentControllerParams {
    @IsString()
    commentId!: string;
}

@Controller('comments/:commentId/answers')
export class DeleteAnswerCommentController {
    constructor(
        readonly nestDeleteAnswerCommentUseCase: NestDeleteAnswerCommentUseCase,
    ) { }

    @Delete()
    @HttpCode(204)
    async handler(
        @Param() params: DeleteAnswerCommentControllerParams,
        @CurrentUser() user: UserJwtPayload,
    ) {
        await this.nestDeleteAnswerCommentUseCase.execute({
            authorId: user.sub,
            answerCommentId: params.commentId
        });


    }
}
