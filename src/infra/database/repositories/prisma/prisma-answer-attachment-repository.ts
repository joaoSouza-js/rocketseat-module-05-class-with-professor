import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerAttachmentRepository } from "@/domain/forum/application/repositories/answer-attachment-repository";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";
import { PrismaService } from "@/infra/services/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaAnswerAttachmentMapper } from "../../mappers/prisma-answer-attachment-mapper";

@Injectable()
export class PrismaAnswerAttachmentRepository implements AnswerAttachmentRepository {

    constructor(readonly prismaService: PrismaService) { }


    async findManyByAnswerId(
        answerId: UniqueEntityId,
    ): Promise<AnswerAttachment[]> {
        const questionAttachments = await this.prismaService.attachment.findMany({
            where: {
                questionId: answerId.toString()
            },

        })

        const questionAttachmentsToDomain = questionAttachments.map(PrismaAnswerAttachmentMapper.toDomain)
        return questionAttachmentsToDomain
    }

    async deleteManyByAnswerId(answerId: UniqueEntityId): Promise<null> {
        await this.prismaService.attachment.deleteMany({
            where: {
                answerId: answerId.toString()
            }
        })
        return null
    }
}
