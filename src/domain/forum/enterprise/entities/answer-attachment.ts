import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Attachment, type AttachmentProps } from "./attachment";

export interface AnswerAttachmentProps extends AttachmentProps {
    answerId: UniqueEntityId;
}

type createAnswerAttachmentProps = Pick<
    AnswerAttachmentProps,
    "answerId"
>;

export class AnswerAttachment extends Attachment<AnswerAttachmentProps> {

    static create(input: createAnswerAttachmentProps): AnswerAttachment {
        const { answerId } = input;

        return new AnswerAttachment({
            answerId,
            createdAt: new Date(),

        });
    }

    static rehydrate(input: AnswerAttachmentProps): AnswerAttachment {
        return new AnswerAttachment(input)
    }

    get answerId() { return this.props.answerId }
}
