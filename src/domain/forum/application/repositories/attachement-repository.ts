import { Attachment } from "../../enterprise/entities/attachment";

export interface AttachmentRepository {
    create(attachment: Attachment): Promise<void>
}