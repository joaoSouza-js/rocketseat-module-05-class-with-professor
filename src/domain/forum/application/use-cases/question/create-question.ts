import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";
import { QuestionAttachmentList } from "@/domain/forum/enterprise/entities/question-attachment-list";

interface Repositories {
    questionRepository: QuestionRepository;
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

    constructor(deps: CreateQuestionUseCaseDeps) {
        this.questionRepository = deps.repositories.questionRepository;
    }

    async execute(
        input: CreateQuestionUseCaseRequest,
    ): Promise<CreateQuestionUseCaseResponse> {

        const newQuestion = Question.create({
            title: input.title,
            content: input.content,
            authorId: UniqueEntityId.fromString(input.authorId),
        });

        const questionAttachments = input.attachmentsIds.map(attachmentId => {
            const attachment = QuestionAttachment.create({
                questionId: newQuestion.id,
                id: UniqueEntityId.fromString(attachmentId), //attachmentId

            })

            return attachment
        })

        const questionAttachmentList = new QuestionAttachmentList(questionAttachments)

        newQuestion.attachments = questionAttachmentList

        await this.questionRepository.save(newQuestion);

        return {
            question: newQuestion,
        };
    }
}
