import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/question/fetch-question-comments';
import { PrismaQuestionCommentRepository } from '@/infra/database/repositories/prisma/prisma-question-comment-repository';
import { PrismaQuestionRepository } from '@/infra/database/repositories/prisma/prisma-question-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestFetchQuestionCommentsUseCase extends FetchQuestionCommentsUseCase {
    constructor(
        prismaQuestionCommentRepository: PrismaQuestionCommentRepository,
        prismaQuestionRepository: PrismaQuestionRepository,
    ) {
        super({
            repositories: {
                questionCommentRepository: prismaQuestionCommentRepository,
                questionRepository: prismaQuestionRepository,
            },
        });
    }
}
