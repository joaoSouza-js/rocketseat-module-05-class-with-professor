import { AttachmentRepository } from "@/domain/forum/application/repositories/attachement-repository";
import { Attachment } from "@/domain/forum/enterprise/entities/attachment";

export class AttachmentRepositoryInMemory implements AttachmentRepository {
    public attachments: Attachment<{ createdAt: Date, title: string, url: string }>[] = [];
    create(attachment: Attachment<{ createdAt: Date, title: string, url: string }>): Promise<void> {
        this.attachments.push(attachment);
        return Promise.resolve();
    }

}