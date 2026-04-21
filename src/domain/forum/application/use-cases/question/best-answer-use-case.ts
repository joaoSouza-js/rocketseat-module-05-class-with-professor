import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ensureExists } from "@/core/guards/ensure-exist";
import { ensureOwnership } from "@/core/guards/ensure-ownership";
import type { Question } from "@/domain/forum/enterprise/entities/question";
import type { AnswerRepository } from "../../repositories/answer-repository";
import type { QuestionRepository } from "../../repositories/question-repository";

interface BestAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
}

interface BestAnswerUseCaseResponse {
    question: Question;
}

interface Repositories {
    questionRepository: QuestionRepository;
    answerRepository: AnswerRepository;
}

interface BestAnswerUseCaseDeps {
    repositories: Repositories;
}

export class BestAnswerUseCase {
    questionRepository: QuestionRepository;
    answerRepository: AnswerRepository;

    constructor(deps: BestAnswerUseCaseDeps) {
        this.questionRepository = deps.repositories.questionRepository;
        this.answerRepository = deps.repositories.answerRepository;
    }

    async execute(
        input: BestAnswerUseCaseRequest,
    ): Promise<BestAnswerUseCaseResponse> {
        const authorId = UniqueEntityId.fromString(input.authorId);
        const answerId = UniqueEntityId.fromString(input.answerId);

        const answerOrNull = await this.answerRepository.findById(answerId);

        const answer = ensureExists(answerOrNull, "Answer", input.answerId);

        const questionOrNull = await this.questionRepository.findById(
            answer.questionId,
        );

        const question = ensureExists(
            questionOrNull,
            "Question",
            answer.questionId.toString(),
        );

        ensureOwnership(question.authorId, authorId, "Question");

        question.bestAnswerId = answerId;

        await this.questionRepository.update(question);

        return {
            question,
        };
    }
}
