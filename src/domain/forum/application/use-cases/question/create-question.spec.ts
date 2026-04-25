import { QuestionRepositoryInMemory } from "@/infra/database/repositories/in-memory-repositories/question-repository";
import { beforeEach, describe, expect, it } from "vitest";
import type { QuestionRepository } from "../../repositories/question-repository";
import { CreateQuestionUseCase } from "./create-question";

describe("create question use case", () => {
    let sut: CreateQuestionUseCase;
    let questionRepository: QuestionRepository;

    beforeEach(() => {
        questionRepository = new QuestionRepositoryInMemory();
        sut = new CreateQuestionUseCase({
            repositories: {
                questionRepository: questionRepository,
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
});
