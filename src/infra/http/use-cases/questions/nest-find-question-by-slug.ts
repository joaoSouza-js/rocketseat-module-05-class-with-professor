import { FindQuestionBySlugUseCase } from "@/domain/forum/application/use-cases/question/find-question-by-slug";
import { PrismaQuestionRepository } from "@/infra/database/repositories/prisma/prisma-question-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestFindQuestionBySlugUseCase extends FindQuestionBySlugUseCase {
    constructor(readonly prismaQuestionRepository: PrismaQuestionRepository) {

        super({
            repositories: {
                questionRepository: prismaQuestionRepository
            }
        })
    }
}