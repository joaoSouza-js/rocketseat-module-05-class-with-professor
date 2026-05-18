import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { DomainEvents } from "@/domain/events/domain-events";
import type { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import type { Answer } from "@/domain/forum/enterprise/entities/answer";
import { PrismaService } from "@/infra/services/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaAnswerMapper } from "../../mappers/prisma-answer-mapper";
@Injectable()

export class PrismaAnswerRepository implements AnswerRepository {

    constructor(readonly prismaService: PrismaService) { }

    async findByQuestionId(questionId: UniqueEntityId): Promise<Answer[]> {
        const answersFounded = await this.prismaService.answer.findMany({
            where: {
                questionId: questionId.toString()
            }
        })
        const answers = answersFounded.map(PrismaAnswerMapper.toDomain)
        return answers
    }
    async update(answer: Answer): Promise<void> {
        const answerPersistence = PrismaAnswerMapper.toPersistence(answer)
        await this.prismaService.answer.update({
            where: {
                id: answerPersistence.id
            },
            data: answerPersistence
        })

        DomainEvents.dispatchEventsForAggregate(answer.id);

        return Promise.resolve();
    }
    async delete(answerId: UniqueEntityId): Promise<null> {
        await this.prismaService.answer.delete({
            where: {
                id: answerId.toString()
            }
        })

        return null
    }
    async findById(answerId: UniqueEntityId): Promise<Answer | null> {
        const answerFounded = await this.prismaService.answer.findUnique({
            where: {
                id: answerId.toString()
            }
        })

        if (!answerFounded) {
            return null
        }
        const answer = PrismaAnswerMapper.toDomain(answerFounded)

        return answer
    }

    async save(answer: Answer): Promise<void> {
        const answerPersistence = PrismaAnswerMapper.toPersistence(answer)
        await this.prismaService.answer.create({
            data: answerPersistence
        })
        DomainEvents.dispatchEventsForAggregate(answer.id);
        return Promise.resolve();
    }
}
