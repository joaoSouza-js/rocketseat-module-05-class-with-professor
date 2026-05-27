import { Controller, Get, Param, Query } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { CommentPresenter } from '../../presenters/comment-presenter';
import { NestFetchQuestionCommentsUseCase } from '../../use-cases/nest-fetch-question-comments';

export class PaginationQueryParams {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit: number = 10;
}

export class FetchQuestionCommentsControllerParams {
    @IsString()
    questionId!: string
}

@Controller('/comments/question/:questionId')
export class FetchQuestionCommentsController {
    constructor(
        readonly UseCase: NestFetchQuestionCommentsUseCase,
    ) { }
    @Get()
    async handler(
        @Query() query: PaginationQueryParams,
        @Param() params: FetchQuestionCommentsControllerParams
    ) {
        const response = await this.UseCase.execute({
            limit: query.limit,
            page: query.page,
            questionId: params.questionId
        });

        const commentsPresenter = response.comments.map(CommentPresenter.toHTTP);

        return {
            comments: commentsPresenter,
        };
    }
}
