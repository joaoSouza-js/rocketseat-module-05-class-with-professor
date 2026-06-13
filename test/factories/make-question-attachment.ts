import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionAttachment, QuestionAttachmentProps } from "@/domain/forum/enterprise/entities/question-attachment";
import { PrismaQuestionAttachmentMapper } from "@/infra/database/mappers/prisma-question-attachment-mapper";
import { PrismaService } from "@/infra/services/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

export type makeQuestionAttachment = Omit<QuestionAttachmentProps, "createdAt" | "updatedAt">

export function makeQuestionAttachment(override: Partial<QuestionAttachmentProps> = {}): QuestionAttachment {
    const id = UniqueEntityId.create()
    const questionId = UniqueEntityId.create();

    const questionAttachment = QuestionAttachment.create({
        id,
        title: "title",
        url: "url",
        questionId,
        ...override
    })

    return questionAttachment
}


@Injectable()
export class QuestionAttachmentFactory {
    constructor(readonly prismaService: PrismaService) { }
    async makePrisma(override: Partial<QuestionAttachmentProps> = {}): Promise<QuestionAttachment> {
        const questionAttachment = makeQuestionAttachment(override)
        const questionAttachmentModel = PrismaQuestionAttachmentMapper.toPersistence(questionAttachment)
        await this.prismaService.attachment.create({ data: questionAttachmentModel })
        return questionAttachment
    }
}