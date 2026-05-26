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

interface FetchAnswerCommentsUseCaseDeps {
    repositories: Repositories;
}

interface FetchAnswerCommentsUseCaseRequest extends PaginationParams {
    answerId: string;
}

interface FetchAnswerCommentsUseCaseResponse {
    comments: AnswerComment[];
}
export class FetchAnswerCommentsUseCase {
    answerRepository: AnswerRepository;
    answerCommentRepository: AnswerCommentRepository;

    constructor(deps: FetchAnswerCommentsUseCaseDeps) {
        this.answerRepository = deps.repositories.answerRepository;
        this.answerCommentRepository = deps.repositories.answerCommentRepository;
    }

    async execute(
        input: FetchAnswerCommentsUseCaseRequest,
    ): Promise<FetchAnswerCommentsUseCaseResponse> {
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
