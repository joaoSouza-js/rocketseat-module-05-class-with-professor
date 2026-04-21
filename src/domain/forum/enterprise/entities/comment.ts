import { Entity } from "@/core/entities/entity";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface CommentProps {
    content: string;
    authorId: UniqueEntityId;
    createdAt: Date;
    updatedAt?: Date;
}


export abstract class Comment<Props extends CommentProps> extends Entity<Props> {


    get createdAt() { return this.props.createdAt }
    get updatedAt(): Date | undefined { return this.props.updatedAt }

    get authorId() { return this.props.authorId }
    get content() { return this.props.content }

    private touch() {
        this.props.updatedAt = new Date()
    }


    set content(value: string) {
        this.content = value
        this.touch()
    }

    set updatedAt(value: Date) {
        this.updatedAt = value
        this.touch()
    }
}
