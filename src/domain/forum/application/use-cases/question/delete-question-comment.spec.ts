import { QuestionCommentRepositoryInMemory } from "@/infra/database/repositories/in-memory-repositories/question-comment-repository";
import { QuestionRepositoryInMemory } from "@/infra/database/repositories/in-memory-repositories/question-repository";
import { makeQuestion } from "test/factories/make-question";
import { makeQuestionComment } from "test/factories/make-question-comment";
import { beforeEach, describe, expect, it } from "vitest";
import type { QuestionCommentRepository } from "../../repositories/question-comment-repository";
import type { QuestionRepository } from "../../repositories/question-repository";
import { DeleteQuestionCommentsUseCase } from "./delete-question-comment";

describe("find question comments use case", () => {
    let sut: DeleteQuestionCommentsUseCase;
    let questionRepository: QuestionRepository;
    let questionCommentRepository: QuestionCommentRepository;
    beforeEach(() => {
        questionRepository = new QuestionRepositoryInMemory();
        questionCommentRepository = new QuestionCommentRepositoryInMemory();
        sut = new DeleteQuestionCommentsUseCase({
            repositories: { questionCommentRepository },
        });
    });

    it("should delete a question comment ", async () => {
        const question = makeQuestion();
        await questionRepository.save(question);

        const commentQuestion = makeQuestionComment({
            authorId: question.authorId,
            questionId: question.id,
        });

        await questionCommentRepository.save(commentQuestion);

        await sut.execute({
            questionCommentId: commentQuestion.id.toString(),
            authorId: question.authorId.toString(),
        });

        const questionComments =
            await questionCommentRepository.findManyByQuestionId(question.id, {
                limit: 10,
                page: 10
            });

        expect(questionComments).toHaveLength(0);
    });


});
