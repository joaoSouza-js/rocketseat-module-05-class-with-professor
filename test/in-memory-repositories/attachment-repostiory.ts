import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AttachmentRepository } from "@/domain/forum/application/repositories/attachement-repository";
import { Attachment, AttachmentProps } from "@/domain/forum/enterprise/entities/attachment";

export class AttachmentRepositoryInMemory implements AttachmentRepository {
    public attachments: Attachment<AttachmentProps>[] = [];
    findMany(ids: UniqueEntityId[]): Promise<Attachment<AttachmentProps>[]> {
        const attachments = this.attachments.filter(attachment => {
            const hasAttachment = ids.some(attachmentId => attachmentId.equals(attachment.id))
            return hasAttachment
        })
        return Promise.resolve(attachments)
    }
    create(attachment: Attachment<AttachmentProps>): Promise<void> {
        this.attachments.push(attachment);
        return Promise.resolve();
    }

}