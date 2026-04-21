import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
    Answer,
    type AnswerProps,
} from "@/domain/forum/enterprise/entities/answer";

type MakeAnswerProps = Partial<Omit<AnswerProps, "createdAt">>;

export function makeAnswer(overwrite?: MakeAnswerProps): Answer {
    const authorId = UniqueEntityId.create();
    const questionId = UniqueEntityId.create();
    const content = faker.word.words({
        count: { min: 8, max: 20 },
    });

    const answer = Answer.create({
        content: content,
        authorId: authorId,
        questionId: questionId,
        ...overwrite,
    });

    return answer;
}
