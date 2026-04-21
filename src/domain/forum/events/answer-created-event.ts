import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { DomainEvent } from "@/domain/events/domain-event";
import type { Answer } from "../enterprise/entities/answer";

export class AnswerCreatedEvent implements DomainEvent {
    public answer: Answer;
    public occurredAt: Date;

    constructor(answer: Answer) {
        this.answer = answer;
        this.occurredAt = new Date();
    }

    getAggregateId(): UniqueEntityId {
        return this.answer.id;
    }
}
