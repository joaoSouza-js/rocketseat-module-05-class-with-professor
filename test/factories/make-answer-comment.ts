import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
    AnswerComment,
    type AnswerCommentProps,
} from "@/domain/forum/enterprise/entities/answer-comment";

type MakeAnswerCommentProps = Partial<
    Omit<AnswerCommentProps, "createdAt">
>;

export function makeAnswerComment(
    overwrite?: MakeAnswerCommentProps,
): AnswerComment {
    const authorId = UniqueEntityId.create();
    const content = faker.word.words();
    const answerId = UniqueEntityId.create();

    const comment = AnswerComment.create({
        authorId,
        answerId,
        content,
        ...overwrite,
    });

    return comment;
}
