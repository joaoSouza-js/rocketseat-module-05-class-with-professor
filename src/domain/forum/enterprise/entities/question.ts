import { AggregateRoot } from "@/core/entities/aggregate-root";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { SlugValueObject } from "@/domain/forum/enterprise/value-object/slug-value-object";
import { QuestionAttachmentList } from "./question-attachment-list";

export interface QuestionProps {
    slug: SlugValueObject;
    title: string;
    content: string;
    authorId: UniqueEntityId;
    bestAnswerId?: UniqueEntityId | null;
    attachments: QuestionAttachmentList;
    createdAt: Date;
    updatedAt?: Date;
}

interface CreateQuestion {
    title: string;
    content: string;
    authorId: UniqueEntityId;
    attachments?: QuestionAttachmentList;
    updatedAt?: Date;
}

export class Question extends AggregateRoot<QuestionProps> {
    static create(input: CreateQuestion) {
        const slug = SlugValueObject.create(input.title);

        const createdAt = new Date();
        return new Question({
            ...input,
            slug: slug,
            createdAt,
            attachments: input.attachments ?? new QuestionAttachmentList(),
        });
    }

    static rehydrate(input: QuestionProps, _id?: UniqueEntityId) {
        return new Question(input, _id);
    }

    public canBeManagedByAuthor(authorId: UniqueEntityId): boolean {
        return this.authorId.equals(authorId);
    }


    private touch() {
        this.props.updatedAt = new Date();
    }

    get title(): string {
        return this.props.title;
    }

    get slug(): SlugValueObject {
        return this.props.slug;
    }

    get content(): string {
        return this.props.content;
    }

    get authorId(): UniqueEntityId {
        return this.props.authorId;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get isNew(): boolean {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        return this.props.createdAt > threeDaysAgo;
    }

    get excerpt(): string {
        if (!this.content) return '';
        return this.content.substring(0, 120).trimEnd().concat("...");
    }

    get bestAnswerId(): UniqueEntityId | undefined | null {
        return this.props.bestAnswerId;
    }

    get attachments(): QuestionAttachmentList {
        return this.props.attachments;
    }

    get updatedAt(): Date | undefined {
        return this.props.updatedAt
    }



    set title(title: string | undefined) {
        if (!title) return;
        this.props.title = title;
        this.props.slug = SlugValueObject.create(title);
        this.touch();
    }

    set bestAnswerId(bestAnswerId: UniqueEntityId) {
        this.props.bestAnswerId = bestAnswerId;

        this.touch();
    }

    set content(content: string | undefined) {
        if (!content) return;
        this.props.content = content;
        this.touch();
    }

    set attachments(attachments: QuestionAttachmentList) {
        this.props.attachments = attachments
        this.touch();
    }
}
