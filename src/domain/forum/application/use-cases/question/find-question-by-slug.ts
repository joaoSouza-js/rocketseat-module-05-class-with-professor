import { ensureExists } from "@/core/guards/ensure-exist";
import type { Question } from "../../../enterprise/entities/question";
import { SlugValueObject } from "../../../enterprise/value-object/slug-value-object";
import type { QuestionRepository } from "../../repositories/question-repository";

interface Repositories {
    questionRepository: QuestionRepository;
}

interface FindQuestionBySlugUseCaseDeps {
    repositories: Repositories;
}

interface FindQuestionBySlugUseCaseRequest {
    slug: string;
}
interface FindQuestionBySlugUseCaseResponse {
    question: Question;
}
export class FindQuestionBySlugUseCase {
    questionRepository: QuestionRepository;

    constructor(deps: FindQuestionBySlugUseCaseDeps) {
        this.questionRepository = deps.repositories.questionRepository;
    }

    async execute(
        input: FindQuestionBySlugUseCaseRequest,
    ): Promise<FindQuestionBySlugUseCaseResponse> {
        const slug = SlugValueObject.fromString(input.slug);

        const questionOrNull = await this.questionRepository.findBySlug(slug);
        const question = ensureExists(questionOrNull, "Question", input.slug);

        return {
            question: question,
        };
    }
}
