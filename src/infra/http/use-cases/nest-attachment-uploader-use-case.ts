import { UploadAndCreateAttachmentsUseCase } from '@/domain/forum/application/use-cases/upload-and-create-attachment-use-case';
import { PrismaAttachmentRepository } from '@/infra/database/repositories/prisma/prisma-attachement-repository';
import { R2StorageService } from '@/infra/services/storage/r2-storage.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestAttachmentUploaderUseCase extends UploadAndCreateAttachmentsUseCase {
    constructor(uploader: R2StorageService, attachmentRepository: PrismaAttachmentRepository) {
        super({
            repositories: { attachmentRepository: attachmentRepository },
            services: { uploader: uploader },
        });
    }
}
