import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { NotificationRepository } from "@/domain/notification/application/repositories/notification-repository";
import type { Notification } from "@/domain/notification/enterprise/entities/notification";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
    async update(notification: Notification): Promise<void> {
        const notificationIndex = this.notifications.findIndex(notificationIndex => notificationIndex.id.equals(notification.id))
        this.notifications[notificationIndex] = notification
        Promise.resolve()
    }
    findManyByRecipientId(recipientId: UniqueEntityId): Promise<Notification[]> {
        const notifications = this.notifications.filter(
            (notification) => notification.recipientId.equals(recipientId),
        );
        return Promise.resolve(notifications);
    }
    save(notification: Notification): Promise<void> {
        this.notifications.push(notification);
        return Promise.resolve();
    }

    findById(notificationId: UniqueEntityId): Promise<Notification | null> {
        const notification = this.notifications.find((notification) =>
            notification.id.equals(notificationId),
        );
        return Promise.resolve(notification || null);
    }
    private notifications: Notification[] = [];
}
