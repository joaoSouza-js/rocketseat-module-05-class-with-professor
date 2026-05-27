import { CreateAnswerCommentUseCase } from "@/domain/forum/application/use-cases/answer/create-answer-comments";
import { PrismaAnswerCommentRepository } from "@/infra/database/repositories/prisma/prisma-answer-comment-repository";
import { PrismaAnswerRepository } from "@/infra/database/repositories/prisma/prisma-answer-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestCreateAnswerCommentUseCase extends CreateAnswerCommentUseCase {
    constructor(prismaAnswerCommentRepository: PrismaAnswerCommentRepository, prismaAnswerRepository: PrismaAnswerRepository) {
        super({
            repositories: {
                answerCommentRepository: prismaAnswerCommentRepository,
                answerRepository: prismaAnswerRepository
            }
        })
    }
}