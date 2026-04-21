import { WatchedList } from "@/core/entities/watched-list";
import { QuestionAttachment } from "./question-attachment";

export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
    compareItems(attachment: QuestionAttachment, secondAttachment: QuestionAttachment): boolean {
        return attachment.id.equals(secondAttachment.id)
    }
}