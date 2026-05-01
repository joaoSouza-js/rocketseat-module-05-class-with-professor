import { EncrypterService } from "@/services/encrypter/encrypter.service";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ApiConfigService } from "src/services/api-config/api-config.service";

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ApiConfigService],
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