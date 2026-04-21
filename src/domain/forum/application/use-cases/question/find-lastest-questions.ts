import type { Question } from "../../../enterprise/entities/question";
import type { QuestionRepository } from "../../repositories/question-repository";

interface Repositories {
    questionRepository: QuestionRepository;
}

interface FindLatestQuestionUseCaseDeps {
    repositories: Repositories;
}

interface FindLatestQuestionUseCaseRequest {
    page?: number;
    limit?: number;
}

interface FindLatestQuestionUseCaseResponse {
    questions: Question[];
}
export class FindLatestQuestionUseCase {
    questionRepository: QuestionRepository;

    constructor(deps: FindLatestQuestionUseCaseDeps) {
        this.questionRepository = deps.repositories.questionRepository;
    }

    async execute(
        input: FindLatestQuestionUseCaseRequest,
    ): Promise<FindLatestQuestionUseCaseResponse> {
        const questions = await this.questionRepository.findLatest({
            limit: input.limit,
            page: input.page,
        });

        return {
            questions: questions,
        };
    }
}
