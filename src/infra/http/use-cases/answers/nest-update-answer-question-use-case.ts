import { UpdateAnswerUseCase } from "@/domain/forum/application/use-cases/answer/update-answer-use-case";
import { PrismaAnswerRepository } from "@/infra/database/repositories/prisma/prisma-answer-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestUpdateAnswerQuestionUseCase extends UpdateAnswerUseCase {
    constructor(prismaAnswerRepository: PrismaAnswerRepository) {
        super({
            repositories: {
                answerRepository: prismaAnswerRepository
            }
        })
    }
}