import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ensureExists } from "@/core/guards/ensure-exist";
import { ensureOwnership } from "@/core/guards/ensure-ownership";
import type { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import type { QuestionCommentRepository } from "../../repositories/question-comment-repository";

interface Repositories {
    questionCommentRepository: QuestionCommentRepository;
}

interface DeleteQuestionCommentsUseCaseDeps {
    repositories: Repositories;
}

interface DeleteQuestionCommentsUseCaseRequest {
    questionCommentId: string;
    authorId: string;
}

interface DeleteQuestionCommentsUseCaseResponse {
    comment: QuestionComment;
}
export class DeleteQuestionCommentsUseCase {
    questionCommentRepository: QuestionCommentRepository;

    constructor(deps: DeleteQuestionCommentsUseCaseDeps) {
        this.questionCommentRepository =
            deps.repositories.questionCommentRepository;
    }

    async execute(
        input: DeleteQuestionCommentsUseCaseRequest,
    ): Promise<DeleteQuestionCommentsUseCaseResponse> {
        const authorId = UniqueEntityId.fromString(input.authorId);
        const questionCommentId = UniqueEntityId.fromString(
            input.questionCommentId,
        );
        const questionCommentOrNull =
            await this.questionCommentRepository.findById(questionCommentId);
        const questionComment = ensureExists(
            questionCommentOrNull,
            "Question Comment",
            input.questionCommentId,
        );
        ensureOwnership(questionComment.authorId, authorId, "Question Comment");

        await this.questionCommentRepository.delete(questionComment);

        return { comment: questionComment };
    }
}
