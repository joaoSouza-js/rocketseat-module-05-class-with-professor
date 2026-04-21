import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Notification } from "../../enterprise/entities/notification";
import type { NotificationRepository } from "../repositories/notification-repository";

interface Repositories {
    notificationRepository: NotificationRepository;
}

interface SendNotificationUseCaseDeps {
    repositories: Repositories;
}

interface SendNotificationUseCaseRequest {
    recipientId: string;
    title: string;
    content: string;
}

interface SendNotificationUseCaseResponse {
    notification: Notification;
}

export class SendNotificationUseCase {
    notificationRepository: NotificationRepository;

    constructor(deps: SendNotificationUseCaseDeps) {
        this.notificationRepository = deps.repositories.notificationRepository;
    }

    async execute(request: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
        const recipientId = UniqueEntityId.fromString(request.recipientId);
        const notification = Notification.create({
            content: request.content,
            recipientId: recipientId,
            title: request.title,
        })

        await this.notificationRepository.save(notification);

        return { notification };
    }
}