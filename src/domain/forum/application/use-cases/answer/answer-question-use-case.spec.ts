import { beforeEach, describe, expect, it } from "vitest";
import type { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { AnswerRepositoryInMemory } from "@/infra/repositories/in-memory-repositories/answer-repository";
import { AnswerQuestionUseCase } from "./answer-question-use-case";

describe(" answer question use case", () => {
    let sut: AnswerQuestionUseCase;
    let answerRepository: AnswerRepository;

    beforeEach(() => {
        answerRepository = new AnswerRepositoryInMemory();
        sut = new AnswerQuestionUseCase({
            repositories: {
                answerRepository,
            },
        });
    });

    it("should create a answer", async () => {
        const result = await sut.execute({
            questionId: "1",
            authorId: "1",
            content: "content",
            attachmentsIds: ["1", "2"],
        });
        expect(result).toBeTruthy();
        expect(result.id.toString()).toEqual(expect.any(String));
    });
});
