import { AggregateRoot } from "@/core/entities/aggregate-root";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerCreatedEvent } from "../../events/answer-created-event";
import { AnswerAttachmentList } from "./answer-attachment-list";

export interface AnswerProps {
    content: string;
    authorId: UniqueEntityId;
    questionId: UniqueEntityId;
    createdAt: Date;
    updatedAt?: Date;
    attachments: AnswerAttachmentList;
}

interface CreateAnswerProps {
    authorId: UniqueEntityId;
    questionId: UniqueEntityId;
    content: string;
    updatedAt?: Date;
}

export class Answer extends AggregateRoot<AnswerProps> {
    static create(input: CreateAnswerProps) {
        const createdAt = new Date();

        const answer = new Answer({
            ...input,
            createdAt,
            attachments: new AnswerAttachmentList(),
        });

        answer.addDomainEvent(new AnswerCreatedEvent(answer));

        return answer;
    }

    static rehydrate(input: AnswerProps) {
        return new Answer(input);
    }

    public canBeManagedByAuthor(authorId: UniqueEntityId): boolean {
        return this.authorId.equals(authorId);
    }

    public updateContent(content?: string) {
        if (content === undefined) return;
        this.content = content;
        this.touch();
    }

    private touch() {
        this.props.updatedAt = new Date();
    }

    get content() {
        return this.props.content;
    }

    get authorId() {
        return this.props.authorId;
    }

    get questionId() {
        return this.props.questionId;
    }

    get excerpt() {
        return this.content.substring(0, 120).trimEnd().concat("...");
    }

    get attachments() {
        return this.props.attachments;
    }

    set attachments(attachments: AnswerAttachmentList) {
        this.props.attachments = attachments;
        this.touch();
    }

    set content(content: string) {
        this.props.content = content;
        this.touch();
    }
}
