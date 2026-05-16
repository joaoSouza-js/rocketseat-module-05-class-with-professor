import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";
import { AttachmentModel } from "@/generated/prisma/models";

export class PrismaAnswerAttachmentMapper {
    static toDomain(attachmentModel: AttachmentModel): AnswerAttachment {
        const attachmentId = UniqueEntityId.fromString(attachmentModel.id);
        const answerId = UniqueEntityId.fromString(attachmentModel.answerId!);
        const attachment = AnswerAttachment.rehydrate({
            createdAt: attachmentModel.createdAt,
            answerId: answerId,
            title: attachmentModel.title,
            url: attachmentModel.url
        }, attachmentId)

        return attachment
    }

    static toPersistence(attachment: AnswerAttachment): AttachmentModel {
        const attachmentModel: AttachmentModel = {
            id: attachment.id.toString(),
            answerId: attachment.answerId.toString(),
            createdAt: attachment.createdAt,
            questionId: null,
            title: attachment.title,
            url: attachment.url
        }

        return attachmentModel
    }
}