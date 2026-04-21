import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Comment, type CommentProps } from "./comment";

export interface AnswerCommentProps extends CommentProps {
    answerId: UniqueEntityId;
}

type CreateAnswerCommentProps = Pick<
    AnswerCommentProps,
    "content" | "authorId" | "answerId"
>;

export class AnswerComment extends Comment<AnswerCommentProps> {
    static create(props: CreateAnswerCommentProps) {
        return new AnswerComment({
            authorId: props.authorId,
            content: props.content,
            answerId: props.answerId,
            createdAt: new Date(),
        });
    }

    static rehydrate(props: AnswerCommentProps, id?: UniqueEntityId) {
        const answerComment = new AnswerComment(props, id);
        return answerComment;
    }

    get answerId() {
        return this.props.answerId;
    }
}
