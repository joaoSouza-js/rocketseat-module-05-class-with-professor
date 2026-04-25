import { Controller, Get, Query } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";
import { PrismaService } from "src/services/prisma/prisma.service";



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
    constructor(readonly prismaService: PrismaService) { }
    @Get()
    async handler(@Query() query: PaginationQueryParams) {
        const questionsPromise = this.prismaService.question.findMany({
            take: query.limit,
            skip: (query.page - 1) * query.limit,
        })

        const questionCountPromise = this.prismaService.question.count()

        const [questions, questionCount] = await Promise.all([questionsPromise, questionCountPromise])


        return {
            questions,
            count: questionCount
        }
    }

} 