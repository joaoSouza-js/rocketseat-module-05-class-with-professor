import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import { CommentModel } from "@/generated/prisma/models";

export class PrismaQuestionCommentMapper {
    static toDomain(commentQuestionModel: CommentModel): QuestionComment {
        const questionComment = QuestionComment.rehydrate({

            authorId: UniqueEntityId.fromString(commentQuestionModel.authorId),
            content: commentQuestionModel.content,
            createdAt: commentQuestionModel.createdAt,
            questionId: UniqueEntityId.fromString(commentQuestionModel.questionId!),

        }, UniqueEntityId.fromString(commentQuestionModel.id))

        return questionComment
    }

    static toPersistence(commentQuestion: QuestionComment): CommentModel {
        const commentQuestionModel: CommentModel = {
            id: commentQuestion.id.toString(),
            authorId: commentQuestion.authorId.toString(),
            questionId: commentQuestion.questionId.toString(),
            content: commentQuestion.content,
            createdAt: commentQuestion.createdAt,
            answerId: null,
            updatedAt: commentQuestion.updatedAt ?? null
        }

        return commentQuestionModel
    }
}
