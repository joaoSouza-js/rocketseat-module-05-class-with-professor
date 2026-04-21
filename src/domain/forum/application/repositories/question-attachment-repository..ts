import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";



export interface QuestionAttachmentRepository {
    findManyByQuestionId(questionId: UniqueEntityId): Promise<QuestionAttachment[]>;
    deleteManyByQuestionId(questionId: UniqueEntityId): Promise<null>
}
