import { Controller, Get, Query } from "@nestjs/common";
import { Transform, Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";
import { PrismaService } from "src/services/prisma/prisma.service";



export class PaginationQueryParams {
    @IsOptional()
    @Type(() => Number)
    @Transform(({ value }) => Number(value ?? 1))
    @IsNumber()
    @Min(1)
    page!: number

    @IsOptional()
    @Type(() => Number)
    @Min(1)
    @Transform(({ value }) => Number(value ?? 10))
    @IsNumber()
    limit!: number
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