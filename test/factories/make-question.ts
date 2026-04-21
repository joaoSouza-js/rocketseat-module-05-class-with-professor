import { faker } from '@faker-js/faker';
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
    Question,
    type QuestionProps,
} from "@/domain/forum/enterprise/entities/question";
import { makeQuestionAttachment } from './make-question-attachment';
import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/question-attachment-list';

type MakeQuestion = Partial<Omit<QuestionProps, "slug" | "createdAt">>;

export function makeQuestion(overwrite?: MakeQuestion): Question {
    const title = faker.word.words({
        count: { min: 1, max: 3 },
    });
    const authorId = UniqueEntityId.create();
    const content = faker.word.words({
        count: { min: 8, max: 20 },
    });


    const newQuestion = Question.create({
        title: title,
        content: content,
        authorId: authorId,
        ...overwrite,
    });
    const questionAttachments = Array.from({ length: 5 }, () => makeQuestionAttachment({
        questionId: newQuestion.id,
    }))

    const questionAttachmentsList = new QuestionAttachmentList(questionAttachments)

    newQuestion.attachments = questionAttachmentsList

    return newQuestion;
}
