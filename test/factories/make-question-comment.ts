import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
    QuestionComment,
    type QuestionCommentProps,
} from "@/domain/forum/enterprise/entities/question-comment";

type MakeQuestionCommentProps = Partial<
    Omit<QuestionCommentProps, "createdAt">
>;

export function makeQuestionComment(
    overwrite?: MakeQuestionCommentProps,
): QuestionComment {
    const authorId = UniqueEntityId.create();
    const content = faker.word.words();
    const questionId = UniqueEntityId.create();

    const comment = QuestionComment.create({
        authorId,
        questionId,
        content,
        ...overwrite,
    });

    return comment;
}
