import { makeQuestion } from "test/factories/make-question";
import { beforeEach, describe, expect, it } from "vitest";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionRepositoryInMemory } from "@/infra/repositories/in-memory-repositories/question-repository";
import type { QuestionRepository } from "../../repositories/question-repository";
import { DeleteQuestionUseCase } from "./delete-question-use-case";
import { QuestionAttachmentRepository } from "../../repositories/question-attachment-repository.";
import { QuestionAttachmentRepositoryInMemory } from "@/infra/repositories/in-memory-repositories/question-attachment-repository";

describe("delete question use case", () => {
    let sut: DeleteQuestionUseCase;
    let questionRepository: QuestionRepository;
    let questionAttachmentsRepository: QuestionAttachmentRepository
    beforeEach(() => {
        questionAttachmentsRepository = new QuestionAttachmentRepositoryInMemory()
        questionRepository = new QuestionRepositoryInMemory({
            repositories: {
                questionAttachmentsRepository: questionAttachmentsRepository
            }
        });
        sut = new DeleteQuestionUseCase({
            repositories: {
                questionRepository: questionRepository,
            },
        });
    });

    it("should delete a question", async () => {
        const authorId = UniqueEntityId.create();

        const newQuestion = makeQuestion({
            authorId: authorId,
        });

        await questionRepository.save(newQuestion);

        const response = await sut.execute({
            authorId: authorId.toString(),
            questionId: newQuestion.id.toString(),
        });


        expect(newQuestion.id.toString()).toBe(response.questionId);
        const question = await questionRepository.findById(newQuestion.id)

        expect(question).toBeFalsy()
        expect(await questionAttachmentsRepository.findManyByQuestionId(newQuestion.id)).toHaveLength(0)

    });

    it("should throw error when question not found", async () => {
        await expect(async () => {
            await sut.execute({
                authorId: "author-1",
                questionId: "question-1",
            });
        }).rejects.toBeInstanceOf(Error);
    });

    it("should throw a error if authorId is not the same as the question author", async () => {
        const wrongAuthorId = UniqueEntityId.create();
        const newQuestion = makeQuestion();

        await questionRepository.save(newQuestion);

        await expect(async () => {
            await sut.execute({
                authorId: wrongAuthorId.toString(),
                questionId: newQuestion.id.toString(),
            });
        }).rejects.toBeInstanceOf(Error);

    })
});
