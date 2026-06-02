import { AttachmentRepositoryInMemory } from "test/in-memory-repositories/attachment-repostiory"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { Uploader } from "../storage/uploader"
import { UploadAndCreateAttachmentsUseCase } from "./upload-and-create-attachment-use-case"

describe("upload and create attachment use case", () => {
    let sut: UploadAndCreateAttachmentsUseCase
    let attachmentRepository: AttachmentRepositoryInMemory
    let uploader: Uploader

    beforeEach(() => {
        attachmentRepository = new AttachmentRepositoryInMemory()
        uploader = { upload: vi.fn(props => Promise.resolve(props.body)) }
        sut = new UploadAndCreateAttachmentsUseCase({ repositories: { attachmentRepository }, services: { uploader } })
    })

    it("should create an attachment", async () => {
        const file = {
            body: Buffer.from([]),
            fileName: "any_name.png",
            mimeType: "image/png"
        }

        await sut.execute(file)

        expect(attachmentRepository.attachments).toHaveLength(1)
    })
})

