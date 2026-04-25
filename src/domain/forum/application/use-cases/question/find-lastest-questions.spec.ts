import { QuestionRepositoryInMemory } from "@/infra/database/repositories/in-memory-repositories/question-repository";
import { afterEach } from "node:test";
import { makeQuestion } from "test/factories/make-question";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { QuestionRepository } from "../../repositories/question-repository";
import { FindLatestQuestionUseCase } from "./find-lastest-questions";

describe("find last questions use case", () => {
    let sut: FindLatestQuestionUseCase;
    let questionRepository: QuestionRepository;

    beforeEach(() => {
        questionRepository = new QuestionRepositoryInMemory();
        sut = new FindLatestQuestionUseCase({
            repositories: { questionRepository },
        });

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should find last questions", async () => {

        const questionsPromises = Array.from({ length: 8 }, () => {
            const twoHoursInMileSeconds = 1000 * 60 * 60 * 2 * 24 // 2 hours
            vi.advanceTimersByTime(twoHoursInMileSeconds);
            const question = makeQuestion();
            return questionRepository.save(question);
        });

        await Promise.all(questionsPromises)

        const response = await sut.execute({
            page: 1,
            limit: 10
        })

        expect(response.questions[0].createdAt.getTime()).toBeGreaterThan(response.questions[1].createdAt.getTime())
        expect(response.questions.length).toBe(8)
    });

    it("should find last questions paginated", async () => {

        const questionsPromises = Array.from({ length: 8 }, () => {
            const twoHoursInMileSeconds = 1000 * 60 * 60 * 2 * 24 // 2 hours
            vi.advanceTimersByTime(twoHoursInMileSeconds);
            const question = makeQuestion();
            return questionRepository.save(question);
        });

        await Promise.all(questionsPromises)

        const response = await sut.execute({
            page: 1,
            limit: 4
        })

        expect(response.questions.length).toBe(4)
    })
});
