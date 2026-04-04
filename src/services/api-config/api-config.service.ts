import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) { }

  get port(): number {
    return this.configService.get<number>('PORT')!;
  }

  get jwtSecretKey(): string {
    return this.configService.get<string>('JWT_SECRET_KEY')!;
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

}
