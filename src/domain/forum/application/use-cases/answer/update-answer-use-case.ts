import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ensureExists } from "@/core/guards/ensure-exist";
import { ensureOwnership } from "@/core/guards/ensure-ownership";
import type { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";

interface Repositories {
    answerRepository: AnswerRepository;
}

interface UpdateAnswerUseCaseDeps {
    repositories: Repositories;
}

interface UpdateAnswerUseCaseRequest {
    answerId: string;
    authorId: string;
    content: string;
}

interface UpdateAnswerUseCaseResponse {
    answerId: string;
}

export class UpdateAnswerUseCase {
    answerRepository: AnswerRepository;

    constructor(deps: UpdateAnswerUseCaseDeps) {
        this.answerRepository = deps.repositories.answerRepository;
    }

    async execute(
        input: UpdateAnswerUseCaseRequest,
    ): Promise<UpdateAnswerUseCaseResponse> {
        const authorId = UniqueEntityId.fromString(input.authorId);
        const answerId = UniqueEntityId.fromString(input.answerId);

        const answerOrNull = await this.answerRepository.findById(answerId);

        const answer = ensureExists(answerOrNull, "Answer", answerId.toString());

        ensureOwnership(answer.authorId, authorId, "Answer");


        answer.content = input.content;

        await this.answerRepository.update(answer);

        return {
            answerId: answer.id.toString(),
        };
    }
}
