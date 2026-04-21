import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Attachment, type AttachmentProps } from "./attachment";

export interface QuestionAttachmentProps extends AttachmentProps {
    questionId: UniqueEntityId;
}

type createQuestionAttachmentProps = Pick<
    QuestionAttachmentProps,
    "questionId"
> & {
    id: UniqueEntityId
}

export class QuestionAttachment extends Attachment<QuestionAttachmentProps> {


    static create(input: createQuestionAttachmentProps): QuestionAttachment {
        const { questionId, id } = input;

        return new QuestionAttachment({
            questionId,
            createdAt: new Date(),
        }, id);
    }

    static rehydrate(input: QuestionAttachmentProps, _id?: UniqueEntityId): QuestionAttachment {
        return new QuestionAttachment(input, _id)
    }

    get questionId() { return this.props.questionId }
}
