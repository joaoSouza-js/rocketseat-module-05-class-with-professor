import { QuestionCommentRepositoryInMemory } from "@/infra/database/repositories/in-memory-repositories/question-comment-repository";
import { QuestionRepositoryInMemory } from "@/infra/database/repositories/in-memory-repositories/question-repository";
import { makeQuestion } from "test/factories/make-question";
import { beforeEach, describe, expect, it } from "vitest";
import type { QuestionCommentRepository } from "../../repositories/question-comment-repository";
import { CreateQuestionCommentUseCase } from "./create-question-comments";

describe("create question comment use case", () => {
    let sut: CreateQuestionCommentUseCase;
    let questionRepository: QuestionRepositoryInMemory;
    let questionCommentRepository: QuestionCommentRepository;

    beforeEach(() => {
        questionRepository = new QuestionRepositoryInMemory();
        questionCommentRepository = new QuestionCommentRepositoryInMemory();
        sut = new CreateQuestionCommentUseCase({
            repositories: { questionRepository, questionCommentRepository },
        });
    });

    it("should create a comment for a question", async () => {
        const question = makeQuestion();

        await questionRepository.save(question);

        const response = await sut.execute({
            questionId: question.id.toString(),
            authorId: question.authorId.toString(),
            content: "test comment",
        });

        expect(response.comment).toBeDefined();
        expect(response.comment.content).toBe("test comment");
        expect(response.comment.authorId).toEqual(question.authorId);
    });

    it("should persist the comment inside the repository", async () => {
        const question = makeQuestion();

        await questionRepository.save(question);

        const response = await sut.execute({
            questionId: question.id.toString(),
            authorId: question.authorId.toString(),
            content: "persisted comment",
        });

        const comments = await questionCommentRepository.findManyByQuestionId(question.id, {
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
