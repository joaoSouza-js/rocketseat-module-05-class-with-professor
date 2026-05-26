import { CreateQuestionCommentUseCase } from "@/domain/forum/application/use-cases/question/create-question-comments";
import { PrismaQuestionCommentRepository } from "@/infra/database/repositories/prisma/prisma-question-comment-repository";
import { PrismaQuestionRepository } from "@/infra/database/repositories/prisma/prisma-question-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestCreateQuestionCommentUseCase extends CreateQuestionCommentUseCase {
    constructor(prismaQuestionCommentRepository: PrismaQuestionCommentRepository, prismaQuestionRepository: PrismaQuestionRepository) {
        super({
            repositories: {
                questionCommentRepository: prismaQuestionCommentRepository,
                questionRepository: prismaQuestionRepository
            }
        })
    }
}