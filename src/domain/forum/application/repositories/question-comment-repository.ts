import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentRepository {
    findById(questionCommentId: UniqueEntityId): Promise<QuestionComment | null>;
    findManyByQuestionId(
        questionId: UniqueEntityId,
        params: PaginationParams,
    ): Promise<QuestionComment[]>;
    save(questionComment: QuestionComment): Promise<void>;
    delete(QuestionComment: QuestionComment): Promise<void>;
}
