import { makeAnswer } from "test/factories/make-answer";
import { beforeEach, describe, expect, it } from "vitest";
import { AnswerCommentRepositoryInMemory } from "@/infra/repositories/in-memory-repositories/answer-comment-repository";
import { AnswerRepositoryInMemory } from "@/infra/repositories/in-memory-repositories/answer-repository";
import type { AnswerCommentRepository } from "../../repositories/answer-comment-repository";
import { CreateAnswerCommentUseCase } from "./create-answer-comments";

describe("create answer comment use case", () => {
    let sut: CreateAnswerCommentUseCase;
    let answerRepository: AnswerRepositoryInMemory;
    let answerCommentRepository: AnswerCommentRepository;

    beforeEach(() => {
        answerRepository = new AnswerRepositoryInMemory();
        answerCommentRepository = new AnswerCommentRepositoryInMemory();
        sut = new CreateAnswerCommentUseCase({
            repositories: { answerRepository, answerCommentRepository },
        });
    });

    it("should create a comment for a answer", async () => {
        const answer = makeAnswer();

        await answerRepository.save(answer);

        const response = await sut.execute({
            answerId: answer.id.toString(),
            authorId: answer.authorId.toString(),
            content: "test comment",
        });

        expect(response.comment).toBeDefined();
        expect(response.comment.content).toBe("test comment");
        expect(response.comment.authorId).toEqual(answer.authorId);
    });

    it("should persist the comment inside the repository", async () => {
        const answer = makeAnswer();

        await answerRepository.save(answer);

        const response = await sut.execute({
            answerId: answer.id.toString(),
            authorId: answer.authorId.toString(),
            content: "persisted comment",
        });

        const comments = await answerCommentRepository.findManyByAnswerId(answer.id, {
            limit: 10,
            page: 1
        });

        expect(comments).toHaveLength(1);
        expect(comments).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: response.comment.id,
                    content: "persisted comment",
                }),
            ]),
        );
    });
});
