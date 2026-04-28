import { FindLatestQuestionUseCase } from "@/domain/forum/application/use-cases/question/find-latest-questions";
import { PrismaQuestionRepository } from "@/infra/database/repositories/prisma/prisma-question-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestFetchLatestQuestionsUseCase extends FindLatestQuestionUseCase {
    constructor(prismaQuestionRepository: PrismaQuestionRepository) {
        super({
            repositories: {
                questionRepository: prismaQuestionRepository
            }
        })
    }
}