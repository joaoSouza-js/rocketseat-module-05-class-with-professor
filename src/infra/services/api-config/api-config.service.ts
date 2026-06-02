import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) { }

  get port(): number {
    return this.configService.get<number>('PORT')!;
  }



  get databaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL')!;
  }

  get jwtPublicRsaKey(): string {
    return this.configService.get<string>('JWT_PUBLIC_KEY')!;
  }

  get jwtSecretRsaKey(): string {
    return this.configService.get<string>('JWT_PRIVATE_KEY')!;
  }

  get schemaId(): string {
    return process.env.SCHEMA_ID!
  }

  get cloudflareAccountId(): string {
    return this.configService.get<string>('CLOUDFLARE_ACCOUNT_ID')!;
  }

  get awsAccessKeyId(): string {
    return this.configService.get<string>('AWS_ACCESS_KEY_ID')!;
  }

  get awsAccessKeySecret(): string {
    return this.configService.get<string>('AWS_ACCESS_KEY_SECRET')!;
  }

  get awsBucketName(): string {
    return this.configService.get<string>('AWS_BUCKET_NAME')!;
  }

}
