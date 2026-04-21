import { makeAnswer } from "test/factories/make-answer";
import { beforeEach, describe, expect, it } from "vitest";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerRepositoryInMemory } from "@/infra/repositories/in-memory-repositories/answer-repository";
import { ResourceNotFoundError } from "../../../../../core/error/resource-not-found-error";
import type { AnswerRepository } from "../../repositories/answer-repository";
import { UpdateAnswerUseCase } from "./update-answer-use-case";

describe("update answer use case", () => {
    let sut: UpdateAnswerUseCase;
    let answerRepository: AnswerRepository;

    beforeEach(() => {
        answerRepository = new AnswerRepositoryInMemory();
        sut = new UpdateAnswerUseCase({
            repositories: {
                answerRepository,
            },
        });
    });

    it("should update an answer content", async () => {
        const authorId = UniqueEntityId.create();

        const answer = makeAnswer({
            authorId,
            content: "old content",
        });

        await answerRepository.save(answer);

        const response = await sut.execute({
            authorId: authorId.toString(),
            answerId: answer.id.toString(),
            content: "new content",
        });

        expect(response.answerId).toBe(answer.id.toString());
        expect(answer.content).toBe("new content");
    });

    it("should throw when answer not found", async () => {
        await expect(
            sut.execute({
                authorId: "author-1",
                answerId: "answer-1",
                content: "new content",
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });


});
