import { Attachment } from "../../enterprise/entities/attachment";

export interface AttachmentRepository {
    create(attachment: Attachment<{ createdAt: Date, title: string, url: string }>): Promise<void>
}