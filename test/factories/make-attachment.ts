import { Attachment, AttachmentProps } from "@/domain/forum/enterprise/entities/attachment";
import { QuestionAttachmentProps } from "@/domain/forum/enterprise/entities/question-attachment";
import { PrismaAttachmentMapper } from "@/infra/database/mappers/prisma-attachment.mapper";
import { PrismaService } from "@/infra/services/prisma/prisma.service";
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";

export type makeQuestionAttachment = Omit<AttachmentProps, "createdAt" | "updatedAt">

export function makeQuestionAttachment(override: Partial<QuestionAttachmentProps> = {}): Attachment<AttachmentProps> {
    const title = override.title ?? faker.internet.username()
    const url = override.url ?? faker.internet.url()


    const attachment = Attachment.create({
        title: title,
        url: url
    })

    return attachment
}

@Injectable()
export class AttachmentFactory {
    constructor(readonly prismaService: PrismaService) { }
    async makePrisma(override: Partial<QuestionAttachmentProps> = {}): Promise<Attachment<AttachmentProps>> {
        const attachment = makeQuestionAttachment(override)
        const attachmentModel = PrismaAttachmentMapper.toPersistence(attachment)
        await this.prismaService.attachment.create({ data: attachmentModel })
        return attachment
    }
}