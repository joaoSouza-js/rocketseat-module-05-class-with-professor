import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ensureExists } from "@/core/guards/ensure-exist";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import type { QuestionCommentRepository } from "../../repositories/question-comment-repository";
import type { QuestionRepository } from "../../repositories/question-repository";

interface Repositories {
    questionRepository: QuestionRepository;
    questionCommentRepository: QuestionCommentRepository;
}

interface CreateQuestionCommentUseCaseDeps {
    repositories: Repositories;
}

interface CreateQuestionCommentUseCaseRequest {
    questionId: string;
    authorId: string;
    content: string;
}

interface CreateQuestionCommentUseCaseResponse {
    comment: QuestionComment;
}
export class CreateQuestionCommentUseCase {
    questionRepository: QuestionRepository;
    questionCommentRepository: QuestionCommentRepository;
    constructor(deps: CreateQuestionCommentUseCaseDeps) {
        this.questionRepository = deps.repositories.questionRepository;
        this.questionCommentRepository =
            deps.repositories.questionCommentRepository;
    }

    async execute(
        input: CreateQuestionCommentUseCaseRequest,
    ): Promise<CreateQuestionCommentUseCaseResponse> {
        const questionId = UniqueEntityId.fromString(input.questionId);
        const authorId = UniqueEntityId.fromString(input.authorId);

        const question = await this.questionRepository.findById(questionId);
        ensureExists(question, "Question", input.questionId);

        const questionComment = QuestionComment.create({
            authorId,
            content: input.content,
            questionId,
        });

        await this.questionCommentRepository.save(questionComment)

        return {
            comment: questionComment,
        };
    }
}
