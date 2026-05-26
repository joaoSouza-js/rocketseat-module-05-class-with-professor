import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comment-repository";
import type { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import { PrismaService } from "@/infra/services/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaAnswerCommentMapper } from "../../mappers/prisma-answer-comment-mapper";

@Injectable()
export class PrismaAnswerCommentRepository
    implements AnswerCommentRepository {


    constructor(readonly prismaService: PrismaService) { }

    async findById(answerCommentId: UniqueEntityId): Promise<AnswerComment | null> {
        const answerCommentFounded = await this.prismaService.comment.findUnique({
            where: {
                id: answerCommentId.toString()
            }
        })

        if (answerCommentFounded === null) {
            return null
        }

        const answerComment = PrismaAnswerCommentMapper.toDomain(answerCommentFounded)
        return answerComment
    }
    answerComments: AnswerComment[] = [];

    async findManyByAnswerId(
        answerId: UniqueEntityId,
        params: PaginationParams,
    ): Promise<AnswerComment[]> {
        const { page = 1, limit = 10 } = params;

        const answerComments = await this.prismaService.comment.findMany({
            where: {
                answerId: answerId.toString()
            },
            take: limit,
            skip: (page - 1) * limit
        })

        const answerCommentsToDomain = answerComments.map(PrismaAnswerCommentMapper.toDomain)

        return Promise.resolve(answerCommentsToDomain);
    }
    async save(answerComment: AnswerComment): Promise<void> {

        const answerCommentToPersistence = PrismaAnswerCommentMapper.toPersistence(answerComment)
        await this.prismaService.comment.create({
            data: answerCommentToPersistence
        })
    }
    async delete(answerComment: AnswerComment): Promise<void> {

        await this.prismaService.comment.delete({
            where: {
                id: answerComment.id.toString()
            }
        })
    }
}
