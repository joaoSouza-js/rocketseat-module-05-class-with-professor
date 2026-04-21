import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Notification } from "../../enterprise/entities/notification";
import type { NotificationRepository } from "../repositories/notification-repository";
import { ensureExists } from "@/core/guards/ensure-exist";
import { ensureOwnership } from "@/core/guards/ensure-ownership";

interface Repositories {
    notificationRepository: NotificationRepository;
}

interface ReadNotificationUseCaseDeps {
    repositories: Repositories;
}

interface ReadNotificationUseCaseRequest {
    notificationId: string;
    recipientId: string;
}

interface ReadNotificationUseCaseResponse {
    notification: Notification;
}

export class ReadNotificationUseCase {
    notificationRepository: NotificationRepository;

    constructor(deps: ReadNotificationUseCaseDeps) {
        this.notificationRepository = deps.repositories.notificationRepository;
    }

    async execute(request: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
        const notificationId = UniqueEntityId.fromString(request.notificationId);
        const recipientId = UniqueEntityId.fromString(request.recipientId);


        const notificationOrNull = await this.notificationRepository.findById(notificationId);
        const notification = ensureExists(notificationOrNull, "Notification", notificationId.toString());
        ensureOwnership(notification.recipientId, recipientId, "Notification", notificationId.toString());
        notification.read()

        await this.notificationRepository.update(notification);

        return { notification };
    }
}