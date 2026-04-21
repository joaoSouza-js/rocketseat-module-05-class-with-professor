import { makeAnswer } from "test/factories/make-answer";
import { beforeEach, describe, expect, it } from "vitest";
import { AnswerRepositoryInMemory } from "@/infra/repositories/in-memory-repositories/answer-repository";
import { ResourceNotFoundError } from "../../../../../core/error/resource-not-found-error";
import type { AnswerRepository } from "../../repositories/answer-repository";
import { DeleteAnswerUseCase } from "./delete-answer-use-case";

describe("delete question use case", () => {
    let sut: DeleteAnswerUseCase;
    let answerRepository: AnswerRepository;

    beforeEach(() => {
        answerRepository = new AnswerRepositoryInMemory();
        sut = new DeleteAnswerUseCase({
            repositories: {
                answerRepository: answerRepository,
            },
        });
    });

    it("should delete a answer", async () => {
        const newAnswer = makeAnswer();
        await answerRepository.save(newAnswer);
        const result = await sut.execute({
            answerId: newAnswer.id.toString(),
            authorId: newAnswer.authorId.toString(),
        });
        expect(result.answerId).toEqual(newAnswer.id.toString());
    });

    it("should throw a ResourceNotFoundError if question not found", async () => {
        await expect(async () => {
            await sut.execute({
                answerId: "answer-1",
                authorId: "author-1",
            });
        }).rejects.toBeInstanceOf(ResourceNotFoundError);
    });


});
