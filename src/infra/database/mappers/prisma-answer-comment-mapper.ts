import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import { CommentModel } from "@/generated/prisma/models";

export class PrismaAnswerCommentMapper {
    static toDomain(commentAnswerModel: CommentModel): AnswerComment {
        const answerComment = AnswerComment.rehydrate({
            authorId: UniqueEntityId.fromString(commentAnswerModel.authorId),
            content: commentAnswerModel.content,
            createdAt: commentAnswerModel.createdAt,
            answerId: UniqueEntityId.fromString(commentAnswerModel.answerId!),

        })

        return answerComment
    }

    static toPersistence(commentAnswer: AnswerComment): CommentModel {
        const commentAnswerModel: CommentModel = {
            id: commentAnswer.id.toString(),
            authorId: commentAnswer.authorId.toString(),
            answerId: commentAnswer.answerId.toString(),
            content: commentAnswer.content,
            createdAt: commentAnswer.createdAt,
            questionId: null,
            updatedAt: commentAnswer.updatedAt ?? null
        }

        return commentAnswerModel
    }
}
