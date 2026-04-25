import { AnswerRepositoryInMemory } from "@/infra/database/repositories/in-memory-repositories/answer-repository";
import { QuestionRepositoryInMemory } from "@/infra/database/repositories/in-memory-repositories/question-repository";
import { makeAnswer } from "test/factories/make-answer";
import { makeQuestion } from "test/factories/make-question";
import { beforeEach, describe, expect, it } from "vitest";
import { BestAnswerUseCase } from "./best-answer-use-case";

describe("best answer use case", () => {
    let sut: BestAnswerUseCase;

    let questionRepository: QuestionRepositoryInMemory;
    let answerRepository: AnswerRepositoryInMemory;

    beforeEach(() => {
        questionRepository = new QuestionRepositoryInMemory();
        answerRepository = new AnswerRepositoryInMemory();

        sut = new BestAnswerUseCase({
            repositories: {
                questionRepository,
                answerRepository,
            },
        });
    });

    it("should set bestAnswerId on question", async () => {
        const question = makeQuestion();
        await questionRepository.save(question);

        const answer = makeAnswer({
            questionId: question.id,
        });
        await answerRepository.save(answer);

        const response = await sut.execute({
            authorId: question.authorId.toString(),
            answerId: answer.id.toString(),
        });


        expect(response.question.bestAnswerId).toEqual(answer.id);
    });

    it("should persist bestAnswerId in repository", async () => {
        const question = makeQuestion();
        await questionRepository.save(question);

        const answer = makeAnswer({
            questionId: question.id,
        });
        await answerRepository.save(answer);

        await sut.execute({
            authorId: question.authorId.toString(),
            answerId: answer.id.toString(),
        });

        const updatedQuestion = await questionRepository.findById(question.id);
        expect(updatedQuestion?.bestAnswerId).toEqual(answer.id);
    });
});
