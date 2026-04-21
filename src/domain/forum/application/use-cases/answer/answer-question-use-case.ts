import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";
import { AnswerAttachmentList } from "@/domain/forum/enterprise/entities/answer-attachment-list";

interface AnswerQuestionUseCaseRequest {
    questionId: string;
    authorId: string;
    content: string;
    attachmentsIds: string[];
}

interface Repositories {
    answerRepository: AnswerRepository;
}

interface AnswerQuestionUseCaseDeps {
    repositories: Repositories;
}

export class AnswerQuestionUseCase {
    answerRepository: AnswerRepository;

    constructor(deps: AnswerQuestionUseCaseDeps) {
        this.answerRepository = deps.repositories.answerRepository;
    }

    async execute(request: AnswerQuestionUseCaseRequest): Promise<Answer> {
        const questionId = UniqueEntityId.fromString(request.questionId);
        const authorId = UniqueEntityId.fromString(request.authorId);

        const answer = Answer.create({
            questionId: questionId,
            authorId: authorId,
            content: request.content,
        });

        const attachments: AnswerAttachment[] = request.attachmentsIds.map((attachmentId) => {
            return AnswerAttachment.create({ answerId: answer.id });
        });

        answer.attachments = new AnswerAttachmentList(attachments);

        await this.answerRepository.save(answer);

        return answer;
    }
}
