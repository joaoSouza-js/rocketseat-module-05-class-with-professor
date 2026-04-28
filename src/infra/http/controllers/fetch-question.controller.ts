import { Controller, Get, Query } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";
import { PrismaService } from "src/services/prisma/prisma.service";
import { NestFetchLatestQuestionsUseCase } from "../use-cases/nest-fetch-latest-questions-use-case";



export class PaginationQueryParams {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page: number = 1

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit: number = 10
}




@Controller("/questions")
export class FetchQuestionController {
    constructor(readonly prismaService: PrismaService, readonly UseCase: NestFetchLatestQuestionsUseCase) { }
    @Get()
    async handler(@Query() query: PaginationQueryParams) {
        const response = await this.UseCase.execute({
            limit: query.limit,
            page: query.page
        })

        return {
            questions: response.questions,
            count: response.count
        }
    }

} 