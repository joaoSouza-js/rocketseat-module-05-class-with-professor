import { Entity } from "@/core/entities/entity";

export interface AttachmentProps {
    createdAt: Date
    updatedAt?: Date
}


export class Attachment<Props extends AttachmentProps> extends Entity<Props> {
    get createdAt() { return this.props.createdAt }
    get updatedAt() { return this.props.updatedAt }

    private touch() {
        this.props.updatedAt = new Date()
    }


}