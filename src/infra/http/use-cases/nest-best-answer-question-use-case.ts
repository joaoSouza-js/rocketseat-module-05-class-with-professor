import { BestAnswerUseCase } from "@/domain/forum/application/use-cases/question/best-answer-use-case";
import { PrismaAnswerRepository } from "@/infra/database/repositories/prisma/prisma-answer-repository";
import { PrismaQuestionRepository } from "@/infra/database/repositories/prisma/prisma-question-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestBestAnswerQuestionUseCase extends BestAnswerUseCase {
    constructor(prismaAnswerRepository: PrismaAnswerRepository, prismaQuestionRepository: PrismaQuestionRepository) {
        super({
            repositories: {
                answerRepository: prismaAnswerRepository,
                questionRepository: prismaQuestionRepository
            }
        })
    }
}