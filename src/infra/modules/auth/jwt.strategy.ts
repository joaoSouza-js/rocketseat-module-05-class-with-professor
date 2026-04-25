
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ApiConfigService } from 'src/services/api-config/api-config.service';

class PayloadSchema {
    @IsString()
    sub!: string;
}

export interface UserJwtPayload {
    sub: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(apiConfigService: ApiConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Buffer.from(apiConfigService.jwtSecretRsaKey, 'base64'),
            algorithms: ['RS256'],
        });
    }

    async validate(payload: Record<string, unknown>) {

        const payloadObject = plainToInstance(PayloadSchema, payload)
        const errors = validateSync(payloadObject);

        if (errors.length > 0) {
            throw new UnauthorizedException("token don't have a sub");
        }
        return payloadObject
    }
}
