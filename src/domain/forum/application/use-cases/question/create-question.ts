import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";
import { QuestionAttachmentList } from "@/domain/forum/enterprise/entities/question-attachment-list";
import { AttachmentRepository } from "../../repositories/attachement-repository";

interface Repositories {
    questionRepository: QuestionRepository;
    attachmentRepository: AttachmentRepository
}

interface CreateQuestionUseCaseDeps {
    repositories: Repositories;
}

interface CreateQuestionUseCaseRequest {
    title: string;
    content: string;
    authorId: string;
    attachmentsIds: string[];
}
interface CreateQuestionUseCaseResponse {
    question: Question;
}
export class CreateQuestionUseCase {
    questionRepository: QuestionRepository;
    attachmentRepository: AttachmentRepository

    constructor(deps: CreateQuestionUseCaseDeps) {
        this.questionRepository = deps.repositories.questionRepository;
        this.attachmentRepository = deps.repositories.attachmentRepository
    }

    async execute(
        input: CreateQuestionUseCaseRequest,
    ): Promise<CreateQuestionUseCaseResponse> {

        const newQuestion = Question.create({
            title: input.title,
            content: input.content,
            authorId: UniqueEntityId.fromString(input.authorId),
        });

        const attachmentsId = input.attachmentsIds.map(UniqueEntityId.fromString)
        const attachments = await this.attachmentRepository.findMany(attachmentsId)

        const questionAttachments = attachments.map(attachment => {
            const questionAttachment = QuestionAttachment.create({
                questionId: newQuestion.id,
                id: attachment.id,
                title: attachment.title,
                url: attachment.url
            })

            return questionAttachment
        })

        const questionAttachmentList = new QuestionAttachmentList(questionAttachments)

        newQuestion.attachments = questionAttachmentList

        await this.questionRepository.save(newQuestion);

        return {
            question: newQuestion,
        };
    }
}
