import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ensureExists } from "@/core/guards/ensure-exist";
import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import type { AnswerCommentRepository } from "../../repositories/answer-comment-repository";
import type { AnswerRepository } from "../../repositories/answer-repository";

interface Repositories {
    answerRepository: AnswerRepository;
    answerCommentRepository: AnswerCommentRepository;
}

interface FindAnswerCommentsUseCaseDeps {
    repositories: Repositories;
}

interface FindAnswerCommentsUseCaseRequest extends PaginationParams {
    answerId: string;
}

interface FindAnswerCommentsUseCaseResponse {
    comments: AnswerComment[];
}
export class FindAnswerCommentsUseCase {
    answerRepository: AnswerRepository;
    answerCommentRepository: AnswerCommentRepository;

    constructor(deps: FindAnswerCommentsUseCaseDeps) {
        this.answerRepository = deps.repositories.answerRepository;
        this.answerCommentRepository = deps.repositories.answerCommentRepository;
    }

    async execute(
        input: FindAnswerCommentsUseCaseRequest,
    ): Promise<FindAnswerCommentsUseCaseResponse> {
        const answerId = UniqueEntityId.fromString(input.answerId);
        const answerOrNull = await this.answerRepository.findById(answerId);
        const answer = ensureExists(answerOrNull, "Answer", input.answerId);
        const comments = await this.answerCommentRepository.findManyByAnswerId(
            answer.id,
            {
                limit: input.limit,
                page: input.page,
            },
        );
        return {
            comments: comments,
        };
    }
}
