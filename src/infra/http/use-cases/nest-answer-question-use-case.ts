import { AnswerQuestionUseCase } from "@/domain/forum/application/use-cases/answer/answer-question-use-case";
import { PrismaAnswerRepository } from "@/infra/database/repositories/prisma/prisma-answer-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestAnswerQuestionUseCase extends AnswerQuestionUseCase {
    constructor(prismaAnswerRepository: PrismaAnswerRepository) {
        super({
            repositories: {
                answerRepository: prismaAnswerRepository
            }
        })
    }
}