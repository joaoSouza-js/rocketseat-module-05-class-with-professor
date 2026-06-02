import { AttachmentRepository } from "@/domain/forum/application/repositories/attachement-repository";
import { Attachment } from "@/domain/forum/enterprise/entities/attachment";
import { PrismaService } from "@/infra/services/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaAttachmentRepository implements AttachmentRepository {

    constructor(readonly prismaService: PrismaService) { }
    async create(attachment: Attachment<{ createdAt: Date, title: string, url: string }>): Promise<void> {
        await this.prismaService.attachment.create({
            data: {
                title: attachment.title,
                url: attachment.url,

            }
        })
    }
}