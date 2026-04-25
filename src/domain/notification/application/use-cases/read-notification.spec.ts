import { NotificationRepositoryInMemory } from "@/infra/database/repositories/in-memory-repositories/notification-repository";
import { makeNotification } from "test/factories/make-notification";
import { beforeEach, describe, expect, it } from "vitest";
import { ReadNotificationUseCase } from "./read-notification";

describe("read notification use case", () => {
    let sut: ReadNotificationUseCase
    let notificationRepository: NotificationRepositoryInMemory

    beforeEach(() => {
        notificationRepository = new NotificationRepositoryInMemory()
        sut = new ReadNotificationUseCase({ repositories: { notificationRepository } })
    })

    it("should be able to mark a notification as read", async () => {
        const notification = makeNotification()
        await notificationRepository.save(notification)
        const response = await sut.execute({
            notificationId: notification.id.toString(),
            recipientId: notification.recipientId.toString()
        })

        const foundedNotification = await notificationRepository.findById(response.notification.id)
        expect(foundedNotification?.id).toEqual(notification.id)
        expect(foundedNotification?.readAt).toEqual(expect.any(Date))


    })
});