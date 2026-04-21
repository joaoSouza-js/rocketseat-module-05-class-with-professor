import { WatchedList } from "@/core/entities/watched-list";
import { AnswerAttachment } from "./answer-attachment";

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
    compareItems(attachment: AnswerAttachment, secondAttachment: AnswerAttachment): boolean {
        return attachment.id.equals(secondAttachment.id)
    }
}