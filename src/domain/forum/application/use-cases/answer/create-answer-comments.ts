import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ensureExists } from "@/core/guards/ensure-exist";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import type { AnswerCommentRepository } from "../../repositories/answer-comment-repository";
import type { AnswerRepository } from "../../repositories/answer-repository";

interface Repositories {
    answerRepository: AnswerRepository;
    answerCommentRepository: AnswerCommentRepository;
}

interface CreateAnswerCommentUseCaseDeps {
    repositories: Repositories;
}

interface CreateAnswerCommentUseCaseRequest {
    answerId: string;
    authorId: string;
    content: string;
}

interface CreateAnswerCommentUseCaseResponse {
    comment: AnswerComment;
}
export class CreateAnswerCommentUseCase {
    answerRepository: AnswerRepository;
    answerCommentRepository: AnswerCommentRepository;
    constructor(deps: CreateAnswerCommentUseCaseDeps) {
        this.answerRepository = deps.repositories.answerRepository;
        this.answerCommentRepository = deps.repositories.answerCommentRepository;
    }

    async execute(
        input: CreateAnswerCommentUseCaseRequest,
    ): Promise<CreateAnswerCommentUseCaseResponse> {
        const answerId = UniqueEntityId.fromString(input.answerId);
        const authorId = UniqueEntityId.fromString(input.authorId);

        const answer = await this.answerRepository.findById(answerId);
        ensureExists(answer, "Answer", input.answerId);

        const answerComment = AnswerComment.create({
            authorId,
            content: input.content,
            answerId,
        });

        await this.answerCommentRepository.save(answerComment);

        return {
            comment: answerComment,
        };
    }
}
