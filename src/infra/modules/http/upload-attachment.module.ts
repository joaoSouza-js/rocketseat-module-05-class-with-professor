import { AttachmentsUploadController } from "@/infra/http/controllers/upload-attachments.controller";
import { Module } from "@nestjs/common";
import { UseCasesModule } from "../use-cases/use-case.module";

@Module({
    imports: [UseCasesModule],
    controllers: [
        AttachmentsUploadController
    ],
})
export class UploadAttachmentsModule { }