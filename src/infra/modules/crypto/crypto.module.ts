import { ApiConfigService } from "@/infra/services/api-config/api-config.service";
import { EncrypterService } from "@/infra/services/encrypter/encrypter.service";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ApiConfigService],
            global: true,
            useFactory: (config: ApiConfigService) => ({
                privateKey: Buffer.from(config.jwtSecretRsaKey, "base64"),
                publicKey: Buffer.from(config.jwtPublicRsaKey, "base64"),
                signOptions: {
                    algorithm: "RS256",
                },
            }),
        }),
    ],
    providers: [EncrypterService],
    exports: [EncrypterService]
})
export class CryptographyModule { }