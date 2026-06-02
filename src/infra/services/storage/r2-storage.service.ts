import { Uploader, UploaderParams } from "@/domain/forum/application/storage/uploader";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { ApiConfigService } from "../api-config/api-config.service";

@Injectable()
export class R2StorageService implements Uploader {
    private client: S3Client

    constructor(readonly apiConfigService: ApiConfigService) {
        this.client = new S3Client({
            endpoint: `https://${apiConfigService.cloudflareAccountId}.r2.cloudflarestorage.com`,
            region: 'auto',
            credentials: {
                accessKeyId: apiConfigService.awsAccessKeyId,
                secretAccessKey: apiConfigService.awsAccessKeySecret
            }
        })
    }

    async upload(params: UploaderParams): Promise<string> {
        const uniqueId = randomUUID()
        const uniqueFileName = params.fileName.concat('-').concat(uniqueId)

        await this.client.send(
            new PutObjectCommand({
                Bucket: this.apiConfigService.awsBucketName,
                Key: uniqueFileName,
                Body: params.body,
                ContentType: params.mimeType
            })
        )

        return uniqueFileName
    }

}