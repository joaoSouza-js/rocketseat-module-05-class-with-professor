import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Attachment, AttachmentProps } from "@/domain/forum/enterprise/entities/attachment";
import { AttachmentModel } from "@/generated/prisma/models";

export class PrismaAttachmentMapper {
    static toDomain(attachmentModel: AttachmentModel): Attachment<AttachmentProps> {
        const attachmentId = UniqueEntityId.fromString(attachmentModel.id);
        const attachment = Attachment.rehydrate({
            createdAt: attachmentModel.createdAt,
            title: attachmentModel.title,
            url: attachmentModel.url
        }, attachmentId)

        return attachment
    }

    static toPersistence(attachment: Attachment<AttachmentProps>): AttachmentModel {
        const attachmentModel: AttachmentModel = {
            id: attachment.id.toString(),
            createdAt: attachment.createdAt,
            questionId: null,
            answerId: null,
            title: attachment.title,
            url: attachment.url
        }

        return attachmentModel
    }
}