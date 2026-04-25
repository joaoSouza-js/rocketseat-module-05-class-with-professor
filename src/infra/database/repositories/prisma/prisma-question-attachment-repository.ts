import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionAttachmentRepository } from "@/domain/forum/application/repositories/question-attachment-repository.";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";
import { Injectable } from "@nestjs/common";
@Injectable()
export class PrismaQuestionAttachmentRepository implements QuestionAttachmentRepository {
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
