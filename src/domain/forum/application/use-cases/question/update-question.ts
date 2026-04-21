import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ensureExists } from "@/core/guards/ensure-exist";
import { ensureOwnership } from "@/core/guards/ensure-ownership";
import type { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import type { Question } from "@/domain/forum/enterprise/entities/question";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";
import { QuestionAttachmentRepository } from "../../repositories/question-attachment-repository.";
import { QuestionAttachmentList } from "@/domain/forum/enterprise/entities/question-attachment-list";

interface Repositories {
    questionRepository: QuestionRepository;
    questionAttachmentRepository: QuestionAttachmentRepository
}

interface UpdateQuestionUseCaseDeps {
    repositories: Repositories;

}

interface UpdateQuestionUseCaseRequest {
    title: string;
    content?: string;
    questionId: string;
    authorId: string;
    attachmentsIds: string[];
}
interface UpdateQuestionUseCaseResponse {
    question: Question;
}

export class UpdateQuestionUseCase {
    questionRepository: QuestionRepository;
    questionAttachmentRepository: QuestionAttachmentRepository;

    constructor(deps: UpdateQuestionUseCaseDeps) {
        this.questionRepository = deps.repositories.questionRepository;
        this.questionAttachmentRepository = deps.repositories.questionAttachmentRepository
    }

    async execute(
        input: UpdateQuestionUseCaseRequest,
    ): Promise<UpdateQuestionUseCaseResponse> {
        const authorId = UniqueEntityId.fromString(input.authorId);
        const questionId = UniqueEntityId.fromString(input.questionId);
        const questionOrNull = await this.questionRepository.findById(questionId);

        const question = ensureExists(
            questionOrNull,
            "Question",
            questionId.toString(),
        );

        ensureOwnership(question.authorId, authorId, "Question");

        const currentQuestionAttachments = await this.questionAttachmentRepository.findManyByQuestionId(question.id)
        const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments)

        const questionAttachments = input.attachmentsIds.map(attachmentId => {
            const attachment = QuestionAttachment.rehydrate({
                questionId: question.id,
                createdAt: new Date()

            }, UniqueEntityId.fromString(attachmentId))

            return attachment
        })

        questionAttachmentList.update(questionAttachments)

        question.title = input.title
        question.content = input.content
        question.attachments = questionAttachmentList

        await this.questionRepository.update(question);

        return {
            question: question,
        };
    }
}
