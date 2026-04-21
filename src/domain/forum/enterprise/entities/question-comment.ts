import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Comment, CommentProps } from "./comment";

export interface QuestionCommentProps extends CommentProps {
    questionId: UniqueEntityId
}

type CreateQuestionCommentProps = Pick<QuestionCommentProps, 'content' | 'authorId' | 'questionId'>



export class QuestionComment extends Comment<QuestionCommentProps> {
    static create(props: CreateQuestionCommentProps) {

        return new QuestionComment({
            authorId: props.authorId,
            content: props.content,
            questionId: props.questionId,
            createdAt: new Date(),
        })

    }

    static rehydrate(props: QuestionCommentProps, id?: UniqueEntityId) {
        const questionComment = new QuestionComment(props, id);
        return questionComment;
    }

    get questionId() { return this.props.questionId }

}
