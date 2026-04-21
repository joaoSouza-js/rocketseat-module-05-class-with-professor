import { ensureExists } from "@/core/guards/ensure-exist";
import { DomainEvents } from "@/domain/events/domain-events";
import type { EventHandler } from "@/domain/events/event-handler";
import type { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import { AnswerCreatedEvent } from "@/domain/forum/events/answer-created-event";
import type { SendNotificationUseCase } from "../use-cases/send-notification";

interface Repositories {
    questionRepository: QuestionRepository;
}
interface Services {
    sendNotification: SendNotificationUseCase;
}

interface OnAnswerCreatedDeps {
    repositories: Repositories;
    services: Services;
}

export class OnAnswerCreated implements EventHandler {
    questionRepository: QuestionRepository;
    sendNotification: SendNotificationUseCase;

    constructor(deps: OnAnswerCreatedDeps) {
        this.questionRepository = deps.repositories.questionRepository;
        this.sendNotification = deps.services.sendNotification;
        this.setupSubscriptions();
    }

    setupSubscriptions(): void {
        DomainEvents.register(
            this.sendNewAnswerNotification.bind(this),
            AnswerCreatedEvent.name,
        );
    }
    async sendNewAnswerNotification(data: unknown) {
        const answer = data as AnswerCreatedEvent;

        const questionOrNull = await this.questionRepository.findById(
            answer.answer.questionId,
        );

        const question = ensureExists(
            questionOrNull,
            "Question",
            answer.answer.questionId.toString(),
        );

        this.sendNotification.execute({
            recipientId: question.authorId.toString(),
            title: `New answer in your question "${question.title?.substring(0, 40).concat("...")}"`,
            content: answer.answer.excerpt,
        });
    }
}
