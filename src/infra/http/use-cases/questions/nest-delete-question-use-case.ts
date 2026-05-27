import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/question/delete-question-use-case';
import { PrismaQuestionRepository } from '@/infra/database/repositories/prisma/prisma-question-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestDeleteQuestionUseCase extends DeleteQuestionUseCase {
    constructor(prismaQuestionRepository: PrismaQuestionRepository) {
        super({ repositories: { questionRepository: prismaQuestionRepository } });
    }
}
