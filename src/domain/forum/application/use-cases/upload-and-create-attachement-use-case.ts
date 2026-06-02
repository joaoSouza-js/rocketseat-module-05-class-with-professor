import { ensureTypeValidation } from "@/core/guards/ensure-type-validation";
import { Attachment } from "../../enterprise/entities/attachment";
import { AttachmentRepository } from "../repositories/attachement-repository";
import { Uploader } from "../uploader";

interface Repositories {
    attachmentRepository: AttachmentRepository
}

interface Services {
    uploader: Uploader
}

interface UploadAndCreateAttachmentsUseCaseDeps {
    repositories: Repositories
    services: Services
}

interface UploadAndCreateAttachmentsUseCaseRequest {
    body: Buffer
    fileName: string
    mimeType: string
}

export class UploadAndCreateAttachmentsUseCase {
    attachmentRepository: AttachmentRepository
    uploader: Uploader

    constructor(readonly deps: UploadAndCreateAttachmentsUseCaseDeps) {
        this.attachmentRepository = deps.repositories.attachmentRepository
        this.uploader = deps.services.uploader
    }

    async execute(file: UploadAndCreateAttachmentsUseCaseRequest) {
        const ALLOWED_MIME_TYPES = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'application/pdf',
        ]

        ensureTypeValidation(file.mimeType, ALLOWED_MIME_TYPES)

        const url = await this.uploader.upload({
            body: file.body,
            fileName: file.fileName,
            mimeType: file.mimeType
        })

        const attachment = Attachment.create({
            title: file.fileName,
            url: url
        })

        this.attachmentRepository.create(attachment)
    }

}