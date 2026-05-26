import { makeQuestion } from "test/factories/make-question";
import { makeQuestionComment } from "test/factories/make-question-comment";
import { QuestionCommentRepositoryInMemory } from "test/in-memory-repositories/question-comment-repository";
import { QuestionRepositoryInMemory } from "test/in-memory-repositories/question-repository";
import { beforeEach, describe, expect, it } from "vitest";
import type { QuestionCommentRepository } from "../../repositories/question-comment-repository";
import type { QuestionRepository } from "../../repositories/question-repository";
import { FetchQuestionCommentsUseCase } from "./fetch-question-comments";

describe("fetch question comments use case", () => {
    let sut: FetchQuestionCommentsUseCase;
    let questionRepository: QuestionRepository;
    let questionCommentRepository: QuestionCommentRepository;
    beforeEach(() => {
        questionRepository = new QuestionRepositoryInMemory();
        questionCommentRepository = new QuestionCommentRepositoryInMemory();
        sut = new FetchQuestionCommentsUseCase({
            repositories: { questionRepository, questionCommentRepository },
        });
    });

    it("should fetch question comments related to question ", async () => {
        const question = makeQuestion();
        await questionRepository.save(question);

        const commentsQuestionPromise = Array.from({ length: 8 }, () => {
            const commentQuestion = makeQuestionComment({
                authorId: question.authorId,
                questionId: question.id,
            });
            return questionCommentRepository.save(commentQuestion);
        });
        await Promise.all(commentsQuestionPromise);

        const response = await sut.execute({
            questionId: question.id.toString(),
        });

        const comment = response.comments[0];

        expect(response.comments).toHaveLength(8);
        expect(comment.authorId.toString()).toBe(question.authorId.toString());
        expect(comment.questionId.toString()).toBe(question.id.toString());

        const questionComments = await questionCommentRepository.findManyByQuestionId(question.id, {
            limit: 10,
            page: 1
        });


        expect(questionComments).toHaveLength(8);
    });


    it("should fetch question comments related to question and persist ", async () => {
        const question = makeQuestion();
        await questionRepository.save(question);

        const commentsQuestionPromise = Array.from({ length: 8 }, () => {
            const commentQuestion = makeQuestionComment({
                authorId: question.authorId,
                questionId: question.id,
            });
            return questionCommentRepository.save(commentQuestion);
        });
        await Promise.all(commentsQuestionPromise);

        const response = await sut.execute({
            questionId: question.id.toString(),
        });

        const questionComments = await questionCommentRepository.findManyByQuestionId(question.id, {
            limit: 10,
            page: 1
        });



        expect(questionComments).toHaveLength(8);
    });

    it("should not fetch a comment related to question id", async () => {
        const question = makeQuestion();
        const secondQuestion = makeQuestion();
        await questionRepository.save(question);
        await questionRepository.save(secondQuestion);

        const commentsQuestionPromise = Array.from({ length: 8 }, () => {
            const commentQuestion = makeQuestionComment({
                authorId: question.authorId,
                questionId: question.id,
            });
            return questionCommentRepository.save(commentQuestion);
        });
        await Promise.all(commentsQuestionPromise);

        const response = await sut.execute({
            questionId: secondQuestion.id.toString(),
        });

        expect(response.comments).toHaveLength(0);

    });
});
