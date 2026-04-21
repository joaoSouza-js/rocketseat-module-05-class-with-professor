import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { Notification } from "../../enterprise/entities/notification";

export interface NotificationRepository {
    findManyByRecipientId(recipientId: UniqueEntityId): Promise<Notification[]>;
    save(notification: Notification): Promise<void>;
    findById(notificationId: UniqueEntityId): Promise<Notification | null>;
    update(notification: Notification): Promise<void>;
}
