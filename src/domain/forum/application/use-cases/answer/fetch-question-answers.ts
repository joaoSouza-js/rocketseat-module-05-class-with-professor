import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import type { Answer } from "@/domain/forum/enterprise/entities/answer";

interface Repositories {
    answerRepository: AnswerRepository;
}

interface FetchQuestionAnswersUseCaseDeps {
    repositories: Repositories;
}

interface FetchQuestionAnswersUseCaseRequest {
    questionId: string;
}

interface FetchQuestionAnswersUseCaseResponse {
    answers: Answer[];
}

export class FetchQuestionAnswersUseCase {
    answerRepository: AnswerRepository;

    constructor(deps: FetchQuestionAnswersUseCaseDeps) {
        this.answerRepository = deps.repositories.answerRepository;
    }

    async execute(
        input: FetchQuestionAnswersUseCaseRequest,
    ): Promise<FetchQuestionAnswersUseCaseResponse> {
        const questionId = UniqueEntityId.fromString(input.questionId);

        const answers = await this.answerRepository.findByQuestionId(questionId);

        return {
            answers: answers
        };
    }
}
