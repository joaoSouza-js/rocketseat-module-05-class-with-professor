import { Entity } from "@/core/entities/entity";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface NotificationProps {
    title: string;
    content: string;
    recipientId: UniqueEntityId;
    createdAt: Date;
    readAt?: Date;
}

interface createNotificationProps {
    title: string;
    content: string;
    recipientId: UniqueEntityId;
}

export class Notification extends Entity<NotificationProps> {
    static create(props: createNotificationProps) {
        const now = new Date();
        return new Notification({
            createdAt: now,
            ...props
        }, props.recipientId);
    }

    static rehydrate(props: NotificationProps, _id?: UniqueEntityId) {
        const notification = new Notification(props, _id);
        return notification;
    }



    get title() {
        return this.props.title;
    }

    get content() {
        return this.props.content;
    }

    get recipientId() {
        return this.props.recipientId;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get readAt(): Date | undefined {
        return this.props.readAt;
    }

    read() {
        this.props.readAt = new Date();
    }



}
