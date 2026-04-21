import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentRepository {
    findById(questionCommentId: UniqueEntityId): Promise<AnswerComment | null>;
    findManyByAnswerId(
        answerId: UniqueEntityId,
        params: PaginationParams,
    ): Promise<AnswerComment[]>;
    save(answerComment: AnswerComment): Promise<void>;
    delete(AnswerComment: AnswerComment): Promise<void>;
}
