import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ensureExists } from "@/core/guards/ensure-exist";
import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import type { QuestionCommentRepository } from "../../repositories/question-comment-repository";
import type { QuestionRepository } from "../../repositories/question-repository";

interface Repositories {
    questionRepository: QuestionRepository;
    questionCommentRepository: QuestionCommentRepository;
}

interface FindQuestionCommentsUseCaseDeps {
    repositories: Repositories;
}

interface FindQuestionCommentsUseCaseRequest extends PaginationParams {
    questionId: string;
}

interface FindQuestionCommentsUseCaseResponse {
    comments: QuestionComment[];
}
export class FindQuestionCommentsUseCase {
    questionRepository: QuestionRepository;
    questionCommentRepository: QuestionCommentRepository;

    constructor(deps: FindQuestionCommentsUseCaseDeps) {
        this.questionRepository = deps.repositories.questionRepository;
        this.questionCommentRepository =
            deps.repositories.questionCommentRepository;
    }

    async execute(
        input: FindQuestionCommentsUseCaseRequest,
    ): Promise<FindQuestionCommentsUseCaseResponse> {
        const questionId = UniqueEntityId.fromString(input.questionId);
        const questionOrNull = await this.questionRepository.findById(questionId);
        const question = ensureExists(questionOrNull, "Question", input.questionId);
        const comments = await this.questionCommentRepository.findManyByQuestionId(
            question.id,
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
