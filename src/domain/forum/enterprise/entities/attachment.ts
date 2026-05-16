import { Entity } from "@/core/entities/entity";

export interface AttachmentProps {
    createdAt: Date
    url: string
    title: string
}


export class Attachment<Props extends AttachmentProps> extends Entity<Props> {
    get createdAt() { return this.props.createdAt }
    get url() { return this.props.url }
    get title() { return this.props.title }
}