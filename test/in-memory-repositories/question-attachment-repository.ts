import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionAttachmentRepository } from "@/domain/forum/application/repositories/question-attachment-repository.";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";

export class QuestionAttachmentRepositoryInMemory implements QuestionAttachmentRepository {

    async createMany(attachments: QuestionAttachment[]): Promise<void> {
        this.questionAttachments.push(...attachments);
        return Promise.resolve();
    }
    deleteMany(attachments: QuestionAttachment[]): Promise<void> {
        this.questionAttachments = this.questionAttachments.filter(
            (questionAttachment) => {
                const isOnList = attachments.some((attachment) =>
                    attachment.id.equals(questionAttachment.id)
                );
                return isOnList === false
            }
        );
        return Promise.resolve();
    }
    public questionAttachments: QuestionAttachment[] = [];
    findManyByQuestionId(
        questionId: UniqueEntityId,
    ): Promise<QuestionAttachment[]> {
        const attachments = this.questionAttachments.filter((attachment) =>
            attachment.questionId.equals(questionId),
        );
        return Promise.resolve(attachments);
    }

    deleteManyByQuestionId(questionId: UniqueEntityId): Promise<null> {
        this.questionAttachments = this.questionAttachments.filter(
            (questionAttachment) =>
                questionAttachment.questionId.equals(questionId) === false,
        );

        return Promise.resolve(null)
    }
}
