import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
    Answer,
    type AnswerProps,
} from "@/domain/forum/enterprise/entities/answer";
import { PrismaAnswerMapper } from "@/infra/database/mappers/prisma-answer-mapper";
import { PrismaService } from "@/infra/services/prisma/prisma.service";
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";

type MakeAnswerProps = Partial<Omit<AnswerProps, "createdAt">>;

export function makeAnswer(overwrite?: MakeAnswerProps): Answer {
    const authorId = UniqueEntityId.create();
    const questionId = UniqueEntityId.create();
    const content = faker.word.words({
        count: { min: 8, max: 20 },
    });

    const answer = Answer.create({
        content: content,
        authorId: authorId,
        questionId: questionId,
        ...overwrite,
    });

    return answer;
}

@Injectable()
export class AnswerFactory {
    constructor(readonly prismaService: PrismaService) { }

    async makePrisma(props: MakeAnswerProps) {
        const answer = makeAnswer(props);
        const answerPersistence = PrismaAnswerMapper.toPersistence(answer);

        await this.prismaService.answer.create({
            data: answerPersistence
        })

        return answer
    }
}
