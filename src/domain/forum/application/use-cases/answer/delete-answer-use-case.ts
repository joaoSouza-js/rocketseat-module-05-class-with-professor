import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ensureExists } from "@/core/guards/ensure-exist";
import { ensureOwnership } from "@/core/guards/ensure-ownership";
import type { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";

interface Repositories {
    answerRepository: AnswerRepository;
}

interface DeleteAnswerUseCaseDeps {
    repositories: Repositories;
}

interface DeleteAnswerUseCaseRequest {
    answerId: string;
    authorId: string;
}

interface DeleteAnswerUseCaseResponse {
    answerId: string;
}

export class DeleteAnswerUseCase {
    answerRepository: AnswerRepository;

    constructor(deps: DeleteAnswerUseCaseDeps) {
        this.answerRepository = deps.repositories.answerRepository;
    }

    async execute(
        input: DeleteAnswerUseCaseRequest,
    ): Promise<DeleteAnswerUseCaseResponse> {
        const authorId = UniqueEntityId.fromString(input.authorId);
        const answerId = UniqueEntityId.fromString(input.answerId);

        const answerOrNull = await this.answerRepository.findById(answerId);

        const answer = ensureExists(answerOrNull, "Answer", answerId.toString());

        ensureOwnership(answer.authorId, authorId, "Answer");

        await this.answerRepository.delete(answerId);

        return {
            answerId: answer.id.toString(),
        };
    }
}
