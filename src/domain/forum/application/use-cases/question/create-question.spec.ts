import { AttachmentRepositoryInMemory } from "test/in-memory-repositories/attachment-repostiory";
import { QuestionAttachmentRepositoryInMemory } from "test/in-memory-repositories/question-attachment-repository";
import { QuestionRepositoryInMemory } from "test/in-memory-repositories/question-repository";
import { beforeEach, describe, expect, it } from "vitest";
import type { QuestionRepository } from "../../repositories/question-repository";
import { CreateQuestionUseCase } from "./create-question";

describe("create question use case", () => {
    let sut: CreateQuestionUseCase;
    let questionRepository: QuestionRepository;
    let questionAttachmentRepository: QuestionAttachmentRepositoryInMemory
    let attachmentRepository: AttachmentRepositoryInMemory

    beforeEach(() => {
        questionAttachmentRepository = new QuestionAttachmentRepositoryInMemory()
        attachmentRepository = new AttachmentRepositoryInMemory()
        questionRepository = new QuestionRepositoryInMemory({
            repositories: {
                questionAttachmentsRepository: questionAttachmentRepository
            }
        });
        sut = new CreateQuestionUseCase({
            repositories: {
                questionRepository: questionRepository,
                attachmentRepository: attachmentRepository
            },
        });
    });

    it("should create a question", async () => {
        const result = await sut.execute({
            title: "title",
            content: "content",
            authorId: "1",
            attachmentsIds: ["39029", "32232"],
        });
        expect(result).toBeTruthy();
        expect(result.question.id.toString()).toEqual(expect.any(String));
        expect(result.question.attachments.currentItems).toHaveLength(2);
        const question = await questionRepository.findById(result.question.id);

        expect(question).toBeTruthy()
    });

    it("should persist attachments on attachments repository", async () => {

        const result = await sut.execute({
            title: "title",
            content: "content",
            authorId: "1",
            attachmentsIds: ["39029", "32232"],
        });
        expect(result).toBeTruthy();

        const questionAttachments = await questionAttachmentRepository.findManyByQuestionId(result.question.id)
        expect(questionAttachments).toHaveLength(2)


    })
});
