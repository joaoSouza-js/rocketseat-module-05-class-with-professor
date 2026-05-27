import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/question/create-question';
import { PrismaQuestionRepository } from '@/infra/database/repositories/prisma/prisma-question-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestCreateQuestionUseCase extends CreateQuestionUseCase {
    constructor(prismaQuestionRepository: PrismaQuestionRepository) {
        super({ repositories: { questionRepository: prismaQuestionRepository } });
    }
}
