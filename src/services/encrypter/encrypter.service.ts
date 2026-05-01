import { Encrypter } from "@/domain/forum/application/cryptography/encrypter";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class EncrypterService implements Encrypter {
    constructor(readonly jwtService: JwtService) { }

    encrypt(payload: Record<string, unknown>): Promise<string> {
        const token = this.jwtService.sign(payload);
        return Promise.resolve(token);
    }
}