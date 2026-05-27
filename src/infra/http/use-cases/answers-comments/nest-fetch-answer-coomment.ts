import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/question/fetch-answer-comments';
import { PrismaAnswerCommentRepository } from '@/infra/database/repositories/prisma/prisma-answer-comment-repository';
import { PrismaAnswerRepository } from '@/infra/database/repositories/prisma/prisma-answer-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestFetchAnswerCommentsUseCase extends FetchAnswerCommentsUseCase {
  constructor(
    prismaAnswerCommentRepository: PrismaAnswerCommentRepository,
    prismaAnswerRepository: PrismaAnswerRepository,
  ) {
    super({
      repositories: {
        answerCommentRepository: prismaAnswerCommentRepository,
        answerRepository: prismaAnswerRepository,
      },
    });
  }
}
