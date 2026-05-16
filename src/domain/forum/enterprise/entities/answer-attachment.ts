import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Attachment, type AttachmentProps } from "./attachment";

export interface AnswerAttachmentProps extends AttachmentProps {
    answerId: UniqueEntityId;
}

type createAnswerAttachmentProps = Pick<
    AnswerAttachmentProps,
    "answerId" |
    "title" |
    "url"
>;

export class AnswerAttachment extends Attachment<AnswerAttachmentProps> {

    static create(input: createAnswerAttachmentProps): AnswerAttachment {
        const { answerId, ...rest } = input;

        return new AnswerAttachment({
            answerId,
            createdAt: new Date(),
            ...rest

        });
    }

    static rehydrate(input: AnswerAttachmentProps, _id?: UniqueEntityId): AnswerAttachment {
        return new AnswerAttachment(input, _id)
    }

    get answerId() { return this.props.answerId }
}
