import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AttachmentRepository } from "@/domain/forum/application/repositories/attachement-repository";
import { Attachment, AttachmentProps } from "@/domain/forum/enterprise/entities/attachment";
import { PrismaService } from "@/infra/services/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaAttachmentMapper } from "../../mappers/prisma-attachment.mapper";

@Injectable()
export class PrismaAttachmentRepository implements AttachmentRepository {

    constructor(readonly prismaService: PrismaService) { }
    async findMany(ids: UniqueEntityId[]): Promise<Attachment<AttachmentProps>[]> {
        const rawIds = ids.map(String)
        const primaAttachments = await this.prismaService.attachment.findMany({
            where: {
                id: {
                    in: rawIds
                }
            }
        })
        const attachments = primaAttachments.map(PrismaAttachmentMapper.toDomain)
        return attachments
    }

    async create(attachment: Attachment<AttachmentProps>): Promise<void> {
        await this.prismaService.attachment.create({
            data: {
                title: attachment.title,
                url: attachment.url,

            }
        })
    }
}