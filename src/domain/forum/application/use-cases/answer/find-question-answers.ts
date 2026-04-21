import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import type { Answer } from "@/domain/forum/enterprise/entities/answer";

interface Repositories {
    answerRepository: AnswerRepository;
}

interface FindQuestionAnswersUseCaseDeps {
    repositories: Repositories;
}

interface FindQuestionAnswersUseCaseRequest {
    questionId: string;
}

interface FindQuestionAnswersUseCaseResponse {
    answers: Answer[];
}

export class FindQuestionAnswersUseCase {
    answerRepository: AnswerRepository;

    constructor(deps: FindQuestionAnswersUseCaseDeps) {
        this.answerRepository = deps.repositories.answerRepository;
    }

    async execute(
        input: FindQuestionAnswersUseCaseRequest,
    ): Promise<FindQuestionAnswersUseCaseResponse> {
        const questionId = UniqueEntityId.fromString(input.questionId);

        const answers = await this.answerRepository.findByQuestionId(questionId);

        return {
            answers: answers
        };
    }
}
