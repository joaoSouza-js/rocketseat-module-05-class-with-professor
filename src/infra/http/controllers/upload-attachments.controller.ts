import { Public } from "@/infra/modules/auth/decorators/public.decorator";
import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { NestAttachmentUploaderUseCase } from "../use-cases/nest-attachment-uploader-use-case";

@Controller("/attachments/upload")
@Public()
export class AttachmentsUploadController {
    constructor(readonly nestAttachmentUploaderUseCase: NestAttachmentUploaderUseCase) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB
                new FileTypeValidator({
                    fileType: /(image\/jpeg|image\/jpg|image\/png|application\/pdf)/,
                }),

            ]
        })
    ) file: Express.Multer.File) {
        const response = await this.nestAttachmentUploaderUseCase.execute({
            body: file.buffer,
            fileName: file.originalname,
            mimeType: file.mimetype
        })

        return {
            fileReference: response.fileReference
        }
    }
}