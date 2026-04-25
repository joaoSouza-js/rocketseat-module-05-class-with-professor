
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionAttachmentRepositoryInMemory } from "@/infra/database/repositories/in-memory-repositories/question-attachment-repository";
import { QuestionRepositoryInMemory } from "@/infra/database/repositories/in-memory-repositories/question-repository";
import { makeQuestion } from "test/factories/make-question";
import { beforeEach, describe, expect, it } from "vitest";
import type { QuestionRepository } from "../../repositories/question-repository";
import { UpdateQuestionUseCase } from "./update-question";

describe("update question use case", () => {
    let sut: UpdateQuestionUseCase;
    let questionRepository: QuestionRepository;
    let questionAttachmentRepository: QuestionAttachmentRepositoryInMemory


    beforeEach(() => {
        questionAttachmentRepository = new QuestionAttachmentRepositoryInMemory()
        questionRepository = new QuestionRepositoryInMemory({
            repositories: {
                questionAttachmentsRepository: questionAttachmentRepository
            }
        });
        sut = new UpdateQuestionUseCase({
            repositories: {
                questionRepository,
                questionAttachmentRepository
            },
        });
    });



    it("should update question title and content", async () => {
        const authorId = UniqueEntityId.create();

        const question = makeQuestion({
            authorId,
            title: "old title",
            content: "old content",
        });

        await questionRepository.save(question);

        const response = await sut.execute({
            authorId: authorId.toString(),
            questionId: question.id.toString(),
            title: "new title",
            content: "new content",
            attachmentsIds: ["1", "2"],
        });

        expect(response.question.title).toBe("new title");
        expect(response.question.content).toBe("new content");
    });

    it("should update only title when content is undefined", async () => {
        const authorId = UniqueEntityId.create();

        const question = makeQuestion({
            authorId,
            title: "old title",
            content: "old content",
        });

        await questionRepository.save(question);

        const response = await sut.execute({
            authorId: authorId.toString(),
            questionId: question.id.toString(),
            title: "new title",
            attachmentsIds: ["1", "2"],

        });

        expect(response.question.title).toBe("new title");
        expect(response.question.content).toBe("old content");
    });

    it("should update question attachments", async () => {
        const authorId = UniqueEntityId.create();

        const question = makeQuestion({
            authorId,
            title: "old title",
            content: "old content",
        });


        questionAttachmentRepository.questionAttachments = question.attachments.getItems()



        await questionRepository.save(question);

        const response = await sut.execute({
            authorId: authorId.toString(),
            questionId: question.id.toString(),
            title: "new title",
            content: "new content",
            attachmentsIds: ["1", "2", question.attachments.getItems()[0].id.toString()],
        });


        expect(response.question.attachments.getNewItems()).toHaveLength(2)
        expect(response.question.attachments.getRemovedItems()).toHaveLength(4)
    }
    )

});
