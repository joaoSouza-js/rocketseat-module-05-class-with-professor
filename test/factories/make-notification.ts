import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Notification, NotificationProps } from "@/domain/notification/enterprise/entities/notification";
import { faker } from "@faker-js/faker";

export type makeNotificationProps = Omit<NotificationProps, "createdAt">


export function makeNotification(overwrite?: Partial<makeNotificationProps>) {
    const content = faker.word.words({ count: { min: 8, max: 20 } });
    const recipientId = UniqueEntityId.create();
    const title = faker.word.words({ count: { min: 1, max: 3 } });

    const notification = Notification.create({
        content: content,
        recipientId: recipientId,
        title: title,
        ...overwrite,
    })

    return notification
}