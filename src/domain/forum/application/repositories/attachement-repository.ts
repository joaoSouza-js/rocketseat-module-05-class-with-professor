import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Attachment, AttachmentProps } from "../../enterprise/entities/attachment";

type AttachmentPropsWithId = AttachmentProps & {

}
export interface AttachmentRepository {
    create(attachment: Attachment<AttachmentProps>): Promise<void>
    findMany(ids: UniqueEntityId[]): Promise<Attachment<AttachmentProps>[]>
}