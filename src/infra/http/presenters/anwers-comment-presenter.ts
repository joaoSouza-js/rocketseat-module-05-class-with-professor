import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class AnswerCommentPresenter {

    static toHTTP(comment: AnswerComment) {
        return {
            id: comment.id.toString(),
            content: comment.content,
            authorId: comment.authorId.toString(),
            answerId: comment.answerId.toString(),
            createdAt: comment.createdAt,
        };
    }
}