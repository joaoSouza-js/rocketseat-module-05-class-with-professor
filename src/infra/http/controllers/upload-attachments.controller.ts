import { Public } from "@/infra/modules/auth/decorators/public.decorator";
import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("/attachments/upload")
@Public()
export class AttachmentsUploadController {
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB
                new FileTypeValidator({
                    fileType: /(image\/jpeg|image\/jpg|image\/png|application\/pdf)/,
                }),

            ]
        })
    ) file: Express.Multer.File) {
        return {
            file
        }
    }
}