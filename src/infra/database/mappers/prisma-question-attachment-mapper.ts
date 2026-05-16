import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";
import { AttachmentModel } from "@/generated/prisma/models";

export class PrismaQuestionAttachmentMapper {
    static toDomain(attachmentModel: AttachmentModel): QuestionAttachment {
        const attachmentId = UniqueEntityId.fromString(attachmentModel.id);
        const questionId = UniqueEntityId.fromString(attachmentModel.questionId!);
        const attachment = QuestionAttachment.rehydrate({
            createdAt: attachmentModel.createdAt,
            questionId: questionId,
            title: attachmentModel.title,
            url: attachmentModel.url
        }, attachmentId)

        return attachment
    }

    static toPersistence(attachment: QuestionAttachment): AttachmentModel {
        const attachmentModel: AttachmentModel = {
            id: attachment.id.toString(),
            questionId: attachment.questionId.toString(),
            createdAt: attachment.createdAt,
            answerId: null,
            title: attachment.title,
            url: attachment.url
        }

        return attachmentModel
    }
}