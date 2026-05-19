import { Module } from '@nestjs/common';
import { PrismaAnswerAttachmentRepository } from '../../database/repositories/prisma/prisma-answer-attachment-repository';
import { PrismaAnswerCommentRepository } from '../../database/repositories/prisma/prisma-answer-comment-repository';
import { PrismaAnswerRepository } from '../../database/repositories/prisma/prisma-answer-repository';
import { PrismaNotificationRepository } from '../../database/repositories/prisma/prisma-notification-repository';
import { PrismaQuestionAttachmentRepository } from '../../database/repositories/prisma/prisma-question-attachment-repository';
import { PrismaQuestionCommentRepository } from '../../database/repositories/prisma/prisma-question-comment-repository';
import { PrismaQuestionRepository } from '../../database/repositories/prisma/prisma-question-repository';
import { PrismaStudentRepository } from '../../database/repositories/prisma/prisma-student-repository';

@Module({

    providers: [
        PrismaAnswerAttachmentRepository,
        PrismaAnswerCommentRepository,
        PrismaAnswerRepository,
        PrismaNotificationRepository,
        PrismaStudentRepository,
        PrismaQuestionAttachmentRepository,
        PrismaQuestionCommentRepository,
        PrismaQuestionRepository
    ],
    exports: [
        PrismaAnswerAttachmentRepository,
        PrismaAnswerCommentRepository,
        PrismaAnswerRepository,
        PrismaNotificationRepository,
        PrismaStudentRepository,
        PrismaQuestionAttachmentRepository,
        PrismaQuestionCommentRepository,
        PrismaQuestionRepository
    ]
})
export class DatabaseModule { }
