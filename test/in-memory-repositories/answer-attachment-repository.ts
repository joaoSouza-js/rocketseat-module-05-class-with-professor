import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerAttachmentRepository } from "@/domain/forum/application/repositories/answer-attachment-repository";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";

export class AnswerAttachmentRepositoryInMemory implements AnswerAttachmentRepository {
    public answerAttachments: AnswerAttachment[] = [];

    findManyByAnswerId(
        answerId: UniqueEntityId,
    ): Promise<AnswerAttachment[]> {
        const attachments = this.answerAttachments.filter((attachment) =>
            attachment.answerId.equals(answerId),
        );
        return Promise.resolve(attachments);
    }

    deleteManyByAnswerId(answerId: UniqueEntityId): Promise<null> {
        this.answerAttachments = this.answerAttachments.filter(
            (answerAttachment) =>
                answerAttachment.answerId.equals(answerId) === false,
        );

        return Promise.resolve(null)
    }
}
