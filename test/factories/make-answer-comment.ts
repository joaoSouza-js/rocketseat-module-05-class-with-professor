import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
    AnswerComment,
    type AnswerCommentProps,
} from "@/domain/forum/enterprise/entities/answer-comment";
import { PrismaAnswerCommentMapper } from "@/infra/database/mappers/prisma-answer-comment-mapper";
import { PrismaService } from "@/infra/services/prisma/prisma.service";
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";

type MakeAnswerCommentProps = Partial<
    Omit<AnswerCommentProps, "createdAt">
>;

export function makeAnswerComment(
    overwrite?: MakeAnswerCommentProps,
): AnswerComment {
    const authorId = UniqueEntityId.create();
    const content = faker.word.words();
    const answerId = UniqueEntityId.create();

    const comment = AnswerComment.create({
        authorId,
        answerId,
        content,
        ...overwrite,
    });

    return comment;
}

@Injectable()
export class AnswerCommentFactory {
    constructor(
        readonly prismaService: PrismaService
    ) { }

    async makePrisma(overwrite?: MakeAnswerCommentProps) {
        const answerComment = makeAnswerComment(overwrite);
        const answerCommentPersistent = PrismaAnswerCommentMapper.toPersistence(
            answerComment

        )

        await this.prismaService.comment.create({
            data: answerCommentPersistent
        })


        return answerComment


    }
}