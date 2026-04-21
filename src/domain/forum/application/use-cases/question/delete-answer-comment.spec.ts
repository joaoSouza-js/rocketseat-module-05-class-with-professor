import { makeAnswer } from "test/factories/make-answer";
import { makeAnswerComment } from "test/factories/make-answer-comment";
import { beforeEach, describe, expect, it } from "vitest";
import { AnswerCommentRepositoryInMemory } from "@/infra/repositories/in-memory-repositories/answer-comment-repository";
import { AnswerRepositoryInMemory } from "@/infra/repositories/in-memory-repositories/answer-repository";
import type { AnswerCommentRepository } from "../../repositories/answer-comment-repository";
import type { AnswerRepository } from "../../repositories/answer-repository";
import { DeleteAnswerCommentsUseCase } from "./delete-answer-comment";

describe("find answer comments use case", () => {
    let sut: DeleteAnswerCommentsUseCase;
    let answerRepository: AnswerRepository;
    let answerCommentRepository: AnswerCommentRepository;
    beforeEach(() => {
        answerRepository = new AnswerRepositoryInMemory();
        answerCommentRepository = new AnswerCommentRepositoryInMemory();
        sut = new DeleteAnswerCommentsUseCase({
            repositories: { answerCommentRepository },
        });
    });

    it("should delete a answer comment ", async () => {
        const answer = makeAnswer();
        await answerRepository.save(answer);

        const commentAnswer = makeAnswerComment({
            authorId: answer.authorId,
            answerId: answer.id,
        });

        await answerCommentRepository.save(commentAnswer);

        await sut.execute({
            answerCommentId: commentAnswer.id.toString(),
            authorId: answer.authorId.toString(),
        });

        const answerComments =
            await answerCommentRepository.findManyByAnswerId(answer.id, {
                limit: 10,
                page: 10
            });

        expect(answerComments).toHaveLength(0);
    });


});
