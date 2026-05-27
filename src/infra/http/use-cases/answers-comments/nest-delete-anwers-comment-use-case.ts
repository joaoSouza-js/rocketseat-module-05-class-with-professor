import { DeleteAnswerCommentsUseCase } from "@/domain/forum/application/use-cases/question/delete-answer-comment";
import { PrismaAnswerCommentRepository } from "@/infra/database/repositories/prisma/prisma-answer-comment-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestDeleteAnswerCommentUseCase extends DeleteAnswerCommentsUseCase {
    constructor(prismaAnswerCommentRepository: PrismaAnswerCommentRepository) {
        super({
            repositories: {
                answerCommentRepository: prismaAnswerCommentRepository,
            }
        })
    }
}