import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SessionController } from 'src/controllers/session.controller';
import { ApiConfigService } from 'src/services/api-config/api-config.service';
import { HasherService } from 'src/services/hasher/hasher.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [PassportModule, JwtModule.registerAsync({
        inject: [ApiConfigService],
        useFactory: (config: ApiConfigService) => {
            const jwtSecretPrivateRsaKey = Buffer.from(config.jwtSecretRsaKey, 'base64')
            const jwtSecretPublicRsaKey = Buffer.from(config.jwtPublicRsaKey, 'base64')

            return {
                privateKey: jwtSecretPrivateRsaKey,
                publicKey: jwtSecretPublicRsaKey,

                signOptions: {
                    algorithm: 'RS256',

                }
            }
        }
    })],
    controllers: [SessionController],
    providers: [HasherService, JwtStrategy],

})
export class AuthModule { }
