import { DeleteQuestionCommentsUseCase } from "@/domain/forum/application/use-cases/question/delete-question-comment";
import { PrismaQuestionCommentRepository } from "@/infra/database/repositories/prisma/prisma-question-comment-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestDeleteQuestionCommentUseCase extends DeleteQuestionCommentsUseCase {
    constructor(prismaQuestionCommentRepository: PrismaQuestionCommentRepository) {
        super({
            repositories: {
                questionCommentRepository: prismaQuestionCommentRepository,
            }
        })
    }
}