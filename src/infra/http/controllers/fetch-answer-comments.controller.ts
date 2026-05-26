import { Controller, Get, Param, Query } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { AnswerCommentPresenter } from '../presenters/anwers-comment-presenter';
import { NestFetchAnswerCommentsUseCase } from '../use-cases/nest-fetch-answer-coomment';

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

export class FetchAnswerCommentsControllerParams {
    @IsString()
    answerId!: string
}

@Controller('/comments/answer/:answerId')
export class FetchAnswerCommentsController {
    constructor(
        readonly UseCase: NestFetchAnswerCommentsUseCase,
    ) { }
    @Get()
    async handler(
        @Query() query: PaginationQueryParams,
        @Param() params: FetchAnswerCommentsControllerParams
    ) {
        const response = await this.UseCase.execute({
            limit: query.limit,
            page: query.page,
            answerId: params.answerId
        });

        const commentsPresenter = response.comments.map(AnswerCommentPresenter.toHTTP);

        return {
            comments: commentsPresenter,
        };
    }
}
