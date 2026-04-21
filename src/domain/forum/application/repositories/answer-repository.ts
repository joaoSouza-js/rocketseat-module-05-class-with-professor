import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { Answer } from "../../enterprise/entities/answer";

export interface AnswerRepository {
    save(answer: Answer): Promise<void>;
    findById(answerId: UniqueEntityId): Promise<Answer | null>;
    delete(answerId: UniqueEntityId): Promise<null>;
    update(answer: Answer): Promise<void>;
    findByQuestionId(questionId: UniqueEntityId): Promise<Answer[]>;
}
