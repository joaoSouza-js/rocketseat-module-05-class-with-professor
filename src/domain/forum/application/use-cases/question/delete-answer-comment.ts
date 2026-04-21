import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ensureExists } from "@/core/guards/ensure-exist";
import { ensureOwnership } from "@/core/guards/ensure-ownership";
import type { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import type { AnswerCommentRepository } from "../../repositories/answer-comment-repository";

interface Repositories {
    answerCommentRepository: AnswerCommentRepository;
}

interface DeleteAnswerCommentsUseCaseDeps {
    repositories: Repositories;
}

interface DeleteAnswerCommentsUseCaseRequest {
    answerCommentId: string;
    authorId: string;
}

interface DeleteAnswerCommentsUseCaseResponse {
    comment: AnswerComment;
}
export class DeleteAnswerCommentsUseCase {
    answerCommentRepository: AnswerCommentRepository;

    constructor(deps: DeleteAnswerCommentsUseCaseDeps) {
        this.answerCommentRepository =
            deps.repositories.answerCommentRepository;
    }

    async execute(
        input: DeleteAnswerCommentsUseCaseRequest,
    ): Promise<DeleteAnswerCommentsUseCaseResponse> {
        const authorId = UniqueEntityId.fromString(input.authorId);
        const answerCommentId = UniqueEntityId.fromString(
            input.answerCommentId,
        );
        const answerCommentOrNull =
            await this.answerCommentRepository.findById(answerCommentId);
        const answerComment = ensureExists(
            answerCommentOrNull,
            "Answer Comment",
            input.answerCommentId,
        );
        ensureOwnership(answerComment.authorId, authorId, "Answer Comment");

        await this.answerCommentRepository.delete(answerComment);

        return { comment: answerComment };
    }
}
