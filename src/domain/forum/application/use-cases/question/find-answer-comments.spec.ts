import { AnswerCommentRepositoryInMemory } from "@/infra/database/repositories/in-memory-repositories/answer-comment-repository";
import { AnswerRepositoryInMemory } from "@/infra/database/repositories/in-memory-repositories/answer-repository";
import { makeAnswer } from "test/factories/make-answer";
import { makeAnswerComment } from "test/factories/make-answer-comment";
import { beforeEach, describe, expect, it } from "vitest";
import type { AnswerCommentRepository } from "../../repositories/answer-comment-repository";
import type { AnswerRepository } from "../../repositories/answer-repository";
import { FindAnswerCommentsUseCase } from "./find-answer-comments";

describe("find answer comments use case", () => {
    let sut: FindAnswerCommentsUseCase;
    let answerRepository: AnswerRepository;
    let answerCommentRepository: AnswerCommentRepository;
    beforeEach(() => {
        answerRepository = new AnswerRepositoryInMemory();
        answerCommentRepository = new AnswerCommentRepositoryInMemory();
        sut = new FindAnswerCommentsUseCase({
            repositories: { answerRepository, answerCommentRepository },
        });
    });

    it("should find answer comments related to answer ", async () => {
        const answer = makeAnswer();
        await answerRepository.save(answer);

        const commentsAnswerPromise = Array.from({ length: 8 }, () => {
            const commentAnswer = makeAnswerComment({
                authorId: answer.authorId,
                answerId: answer.id,
            });
            return answerCommentRepository.save(commentAnswer);
        });
        await Promise.all(commentsAnswerPromise);

        const response = await sut.execute({
            answerId: answer.id.toString(),
            page: 1,
            limit: 10
        });

        const comment = response.comments[0];

        expect(response.comments).toHaveLength(8);
        expect(comment.authorId.toString()).toBe(answer.authorId.toString());
        expect(comment.answerId.toString()).toBe(answer.id.toString());

        const answerComments =
            await answerCommentRepository.findManyByAnswerId(answer.id, {
                page: 1,
                limit: 10
            });

        expect(answerComments).toHaveLength(8);
    });

    it("should find answer comments related to answer and persist ", async () => {
        const answer = makeAnswer();
        await answerRepository.save(answer);

        const commentsAnswerPromise = Array.from({ length: 8 }, () => {
            const commentAnswer = makeAnswerComment({
                authorId: answer.authorId,
                answerId: answer.id,
            });
            return answerCommentRepository.save(commentAnswer);
        });
        await Promise.all(commentsAnswerPromise);

        await sut.execute({
            answerId: answer.id.toString(),
            page: 1,
            limit: 10
        });

        const answerComments =
            await answerCommentRepository.findManyByAnswerId(answer.id, {
                page: 1,
                limit: 10
            });

        expect(answerComments).toHaveLength(8);
    });

    it("should not find a comment related to answer id", async () => {
        const answer = makeAnswer();
        const secondAnswer = makeAnswer();
        await answerRepository.save(answer);
        await answerRepository.save(secondAnswer);

        const commentsAnswerPromise = Array.from({ length: 8 }, () => {
            const commentAnswer = makeAnswerComment({
                authorId: answer.authorId,
                answerId: answer.id,
            });
            return answerCommentRepository.save(commentAnswer);
        });
        await Promise.all(commentsAnswerPromise);

        const response = await sut.execute({
            answerId: secondAnswer.id.toString(),
            page: 1,
            limit: 10
        });

        expect(response.comments).toHaveLength(0);
    });
});
