import { DeleteAnswerUseCase } from "@/domain/forum/application/use-cases/answer/delete-answer-use-case";
import { PrismaAnswerRepository } from "@/infra/database/repositories/prisma/prisma-answer-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestDeleteAnswerQuestionUseCase extends DeleteAnswerUseCase {
    constructor(prismaAnswerRepository: PrismaAnswerRepository) {
        super({
            repositories: {
                answerRepository: prismaAnswerRepository
            }
        })
    }
}