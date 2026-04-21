import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";



export interface AnswerAttachmentRepository {
    findManyByAnswerId(answerId: UniqueEntityId): Promise<AnswerAttachment[]>;
    deleteManyByAnswerId(answerId: UniqueEntityId): Promise<null>
}
