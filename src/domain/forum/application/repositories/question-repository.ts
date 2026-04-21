import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { Question } from "../../enterprise/entities/question";
import type { SlugValueObject } from "../../enterprise/value-object/slug-value-object";

export interface DeleteQuestion {
    authorId: UniqueEntityId;
    questionId: UniqueEntityId;
}



export interface QuestionRepository {
    save(question: Question): Promise<Question>;
    findBySlug(slug: SlugValueObject): Promise<Question | null>;
    findById(questionId: UniqueEntityId): Promise<Question | null>;
    delete(questionId: UniqueEntityId): Promise<null>;
    update(question: Question): Promise<void>;
    findLatest(props: PaginationParams): Promise<Question[]>;
}
