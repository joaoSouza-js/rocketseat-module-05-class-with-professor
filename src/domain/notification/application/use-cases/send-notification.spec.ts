import { NotificationRepositoryInMemory } from "@/infra/database/repositories/in-memory-repositories/notification-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SendNotificationUseCase } from "./send-notification";

describe("send notification use case", () => {
    let sut: SendNotificationUseCase
    let notificationRepository: NotificationRepositoryInMemory

    beforeEach(() => {
        notificationRepository = new NotificationRepositoryInMemory()
        sut = new SendNotificationUseCase({ repositories: { notificationRepository } })
    })

    it("should be able to create notification", async () => {
        const response = await sut.execute({
            recipientId: "1",
            title: "title",
            content: "content"
        })

        expect(response.notification.content).toEqual("content")

        const foundedNotification = await notificationRepository.findById(response.notification.id)
        expect(foundedNotification).toBeTruthy()
        expect(foundedNotification?.id).toEqual(response.notification.id)


    })
});