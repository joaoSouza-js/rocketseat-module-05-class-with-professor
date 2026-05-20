import { FetchQuestionAnswersUseCase } from "@/domain/forum/application/use-cases/answer/fetch-question-answers";
import { PrismaAnswerRepository } from "@/infra/database/repositories/prisma/prisma-answer-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestFetchQuestionsAnswersUseCase extends FetchQuestionAnswersUseCase {
    constructor(prismaAnswerRepository: PrismaAnswerRepository) {
        super({
            repositories: {
                answerRepository: prismaAnswerRepository
            }
        })
    }
}