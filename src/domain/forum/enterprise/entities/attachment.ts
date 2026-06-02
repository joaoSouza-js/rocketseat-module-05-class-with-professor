import { Entity } from "@/core/entities/entity";

export interface AttachmentProps {
    createdAt: Date;
    url: string;
    title: string;
}

type CreateAttachment = Omit<AttachmentProps, "createdAt">;

export class Attachment<Props extends AttachmentProps> extends Entity<Props> {
    get createdAt() {
        return this.props.createdAt;
    }

    get url() {
        return this.props.url;
    }

    get title() {
        return this.props.title;
    }

    static create(
        props: CreateAttachment,
    ): Attachment<AttachmentProps> {
        return new Attachment<AttachmentProps>({
            createdAt: new Date(),
            title: props.title,
            url: props.url,
        });
    }
}