import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionAttachmentRepository } from "@/domain/forum/application/repositories/question-attachment-repository.";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";
import { PrismaService } from "@/infra/services/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaQuestionAttachmentMapper } from "../../mappers/prisma-question-attachment-mapper";
@Injectable()
export class PrismaQuestionAttachmentRepository implements QuestionAttachmentRepository {
    public questionAttachments: QuestionAttachment[] = [];

    constructor(readonly prismaService: PrismaService) { }
    async createMany(attachments: QuestionAttachment[]): Promise<void> {
        const attachmentsToPrisma = attachments.map(PrismaQuestionAttachmentMapper.toPersistence)
        const attachmentsId = attachmentsToPrisma.map(attachment => attachment.id)
        await this.prismaService.attachment.updateMany({
            where: {
                id: {
                    in: attachmentsId
                }
            },
            data: {
                questionId: attachments[0].questionId.toString()
            }
        })


    }
    async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
        const attachmentsToPrisma = attachments.map(PrismaQuestionAttachmentMapper.toPersistence)
        const attachmentsId = attachmentsToPrisma.map(attachment => attachment.id)

        await this.prismaService.attachment.deleteMany({
            where: {
                id: {
                    in: attachmentsId
                }
            }
        })

    }

    async findManyByQuestionId(
        questionId: UniqueEntityId,
    ): Promise<QuestionAttachment[]> {
        const questionAttachments = await this.prismaService.attachment.findMany({
            where: {
                questionId: questionId.toString()
            },

        })

        const questionAttachmentsToDomain = questionAttachments.map(PrismaQuestionAttachmentMapper.toDomain)
        return questionAttachmentsToDomain
    }


    async deleteManyByQuestionId(questionId: UniqueEntityId): Promise<null> {
        await this.prismaService.attachment.deleteMany({
            where: {
                questionId: questionId.toString()
            }
        })
        return null
    }

}
