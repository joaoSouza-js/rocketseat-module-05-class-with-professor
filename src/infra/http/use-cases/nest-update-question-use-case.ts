import { UpdateQuestionUseCase } from '@/domain/forum/application/use-cases/question/update-question';
import { PrismaQuestionAttachmentRepository } from '@/infra/database/repositories/prisma/prisma-question-attachment-repository';
import { PrismaQuestionRepository } from '@/infra/database/repositories/prisma/prisma-question-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestUpdateQuestionUseCase extends UpdateQuestionUseCase {
    constructor(
        questionRepository: PrismaQuestionRepository,
        prismaQuestionAttachmentRepository: PrismaQuestionAttachmentRepository,
    ) {
        super({
            repositories: {
                questionRepository: questionRepository,
                questionAttachmentRepository: prismaQuestionAttachmentRepository
            },
        });
    }
}
