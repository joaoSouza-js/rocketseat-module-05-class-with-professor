import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
    QuestionComment,
    type QuestionCommentProps,
} from "@/domain/forum/enterprise/entities/question-comment";
import { PrismaQuestionCommentMapper } from "@/infra/database/mappers/prisma-question-comment-mapper";
import { PrismaService } from "@/infra/services/prisma/prisma.service";
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";

type MakeQuestionCommentProps = Partial<
    Omit<QuestionCommentProps, "createdAt">
>;

export function makeQuestionComment(
    overwrite?: MakeQuestionCommentProps,
): QuestionComment {
    const authorId = UniqueEntityId.create();
    const content = faker.word.words();
    const questionId = UniqueEntityId.create();

    const comment = QuestionComment.create({
        authorId,
        questionId,
        content,
        ...overwrite,
    });

    return comment;
}

@Injectable()
export class QuestionCommentFactory {
    constructor(readonly prismaService: PrismaService) { }
    async makePrisma(props: MakeQuestionCommentProps) {
        const questionComment = makeQuestionComment(props);
        const questionCommentPersistence = PrismaQuestionCommentMapper.toPersistence(questionComment)
        await this.prismaService.comment.create({
            data: questionCommentPersistence
        })

        return questionComment
    }
}
