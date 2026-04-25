import { Module } from '@nestjs/common';
import { PrismaAnswerAttachmentRepository } from '../../repositories/prisma/prisma-answer-attachment-repository';
import { PrismaAnswerCommentRepository } from '../../repositories/prisma/prisma-answer-comment-repository';
import { PrismaAnswerRepository } from '../../repositories/prisma/prisma-answer-repository';
import { PrismaNotificationRepository } from '../../repositories/prisma/prisma-notification-repository';
import { PrismaQuestionAttachmentRepository } from '../../repositories/prisma/prisma-question-attachment-repository';
import { PrismaQuestionCommentRepository } from '../../repositories/prisma/prisma-question-comment-repository';
import { PrismaQuestionRepository } from '../../repositories/prisma/prisma-question-repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [
        PrismaModule,

    ],
    providers: [
        PrismaAnswerAttachmentRepository,
        PrismaAnswerCommentRepository,
        PrismaAnswerRepository,
        PrismaNotificationRepository,
        PrismaQuestionAttachmentRepository,
        PrismaQuestionAttachmentRepository,
        PrismaQuestionCommentRepository,
        PrismaQuestionRepository
    ],
    exports: [
        PrismaAnswerAttachmentRepository,
        PrismaAnswerCommentRepository,
        PrismaAnswerRepository,
        PrismaNotificationRepository,
        PrismaQuestionAttachmentRepository,
        PrismaQuestionAttachmentRepository,
        PrismaQuestionCommentRepository,
        PrismaQuestionRepository
    ]
})
export class DatabaseModule { }
