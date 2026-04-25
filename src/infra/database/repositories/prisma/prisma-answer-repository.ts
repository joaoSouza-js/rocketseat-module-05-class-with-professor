import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { DomainEvents } from "@/domain/events/domain-events";
import type { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import type { Answer } from "@/domain/forum/enterprise/entities/answer";
import { Injectable } from "@nestjs/common";
@Injectable()

export class PrismaAnswerRepository implements AnswerRepository {
    findByQuestionId(questionId: UniqueEntityId): Promise<Answer[]> {
        const answers = this.answers.filter((answer) => answer.questionId.equals(questionId));
        return Promise.resolve(answers);
    }
    update(answer: Answer): Promise<void> {
        const index = this.answers.findIndex((currentAnswer) => currentAnswer.id.equals(answer.id));
        this.answers[index] = answer;
        DomainEvents.dispatchEventsForAggregate(answer.id);

        return Promise.resolve();
    }
    delete(answerId: UniqueEntityId): Promise<null> {
        this.answers.filter((answer) => !answer.id.equals(answerId));
        return Promise.resolve(null);
    }
    findById(answerId: UniqueEntityId): Promise<Answer | null> {
        const answer = this.answers.find((answer) => answer.id.equals(answerId));
        return Promise.resolve(answer || null);
    }
    private answers: Answer[] = [];

    save(answer: Answer): Promise<void> {
        this.answers.push(answer);
        DomainEvents.dispatchEventsForAggregate(answer.id);
        return Promise.resolve();
    }
}
