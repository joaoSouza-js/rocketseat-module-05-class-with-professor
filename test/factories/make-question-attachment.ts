import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionAttachment, QuestionAttachmentProps } from "@/domain/forum/enterprise/entities/question-attachment";

export type makeQuestionAttachment = Omit<QuestionAttachmentProps, "createdAt" | "updatedAt">

export function makeQuestionAttachment(override: Partial<QuestionAttachmentProps> = {}): QuestionAttachment {
    const id = UniqueEntityId.create()
    const questionId = UniqueEntityId.create();

    const questionAttachment = QuestionAttachment.create({
        id,
        questionId,
        ...override
    })

    return questionAttachment
}