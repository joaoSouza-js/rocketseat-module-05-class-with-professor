import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ensureExists } from "@/core/guards/ensure-exist";
import { ensureOwnership } from "@/core/guards/ensure-ownership";
import type { QuestionRepository } from "../../repositories/question-repository";

interface Repositories {
    questionRepository: QuestionRepository;
}

interface DeleteQuestionUseCaseDeps {
    repositories: Repositories;
}

interface DeleteQuestionUseCaseRequest {
    questionId: string;
    authorId: string;
}

interface DeleteQuestionUseCaseResponse {
    questionId: string;
}

export class DeleteQuestionUseCase {
    questionRepository: QuestionRepository;

    constructor(deps: DeleteQuestionUseCaseDeps) {
        this.questionRepository = deps.repositories.questionRepository;
    }

    async execute(
        input: DeleteQuestionUseCaseRequest,
    ): Promise<DeleteQuestionUseCaseResponse> {
        const authorId = UniqueEntityId.fromString(input.authorId);
        const questionId = UniqueEntityId.fromString(input.questionId);

        const questionOrNull = await this.questionRepository.findById(questionId);

        const question = ensureExists(
            questionOrNull,
            "Question",
            questionId.toString(),
        );

        ensureOwnership(question.authorId, authorId, "Question");

        await this.questionRepository.delete(questionId);

        return {
            questionId: question.id.toString(),
        };
    }
}
