import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { QuestionCommentRepository } from "@/domain/forum/application/repositories/question-comment-repository";
import type { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import { PrismaService } from "@/infra/services/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaQuestionCommentMapper } from "../../mappers/prisma-question-comment-mapper";

@Injectable()
export class PrismaQuestionCommentRepository
    implements QuestionCommentRepository {


    constructor(readonly prismaService: PrismaService) { }

    async findById(questionCommentId: UniqueEntityId): Promise<QuestionComment | null> {
        const questionCommentFounded = await this.prismaService.comment.findUnique({
            where: {
                id: questionCommentId.toString()
            }
        })


        if (questionCommentFounded === null) {
            return null
        }

        const questionComment = PrismaQuestionCommentMapper.toDomain(questionCommentFounded)
        return questionComment



    }
    questionComments: QuestionComment[] = [];

    async findManyByQuestionId(
        questionId: UniqueEntityId,
        params: PaginationParams,
    ): Promise<QuestionComment[]> {
        const { page = 1, limit = 10 } = params;


        const questionComments = await this.prismaService.comment.findMany({
            where: {
                questionId: questionId.toString()
            },
            take: limit,
            skip: (page - 1) * limit
        })

        const questionCommentsToDomain = questionComments.map(PrismaQuestionCommentMapper.toDomain)

        return Promise.resolve(questionCommentsToDomain);
    }
    async save(questionComment: QuestionComment): Promise<void> {

        const questionCommentToPersistence = PrismaQuestionCommentMapper.toPersistence(questionComment)
        await this.prismaService.comment.create({
            data: questionCommentToPersistence
        })
    }
    async delete(questionComment: QuestionComment): Promise<void> {

        await this.prismaService.comment.delete({
            where: {
                id: questionComment.id.toString()
            }
        })
    }
}
