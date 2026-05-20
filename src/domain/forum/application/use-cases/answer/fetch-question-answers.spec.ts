import { makeAnswer } from "test/factories/make-answer";
import { makeQuestion } from "test/factories/make-question";
import { AnswerRepositoryInMemory } from "test/in-memory-repositories/answer-repository";
import { QuestionRepositoryInMemory } from "test/in-memory-repositories/question-repository";
import { beforeEach, describe, expect, it } from "vitest";
import type { AnswerRepository } from "../../repositories/answer-repository";
import type { QuestionRepository } from "../../repositories/question-repository";
import { FetchQuestionAnswersUseCase } from "./fetch-question-answers";

describe("find question answers use case", () => {
    let sut: FetchQuestionAnswersUseCase;
    let answerRepository: AnswerRepository;
    let questionRepository: QuestionRepository;

    beforeEach(() => {
        answerRepository = new AnswerRepositoryInMemory();
        questionRepository = new QuestionRepositoryInMemory();
        sut = new FetchQuestionAnswersUseCase({
            repositories: {
                answerRepository: answerRepository,
            },
        });
    });

    it("should be able to find question answers", async () => {
        const question = makeQuestion();
        await questionRepository.save(question);

        const newAnswer = makeAnswer({
            questionId: question.id,
        });
        await answerRepository.save(newAnswer);

        const result = await sut.execute({
            questionId: question.id.toString(),
        });

        expect(result.answers).toHaveLength(1);
        expect(result.answers[0].id.toString()).toEqual(newAnswer.id.toString());
    });
});
