import { CreateAccountController } from '@/infra/http/controllers/create-account.controller';
import { SessionController } from '@/infra/http/controllers/session.controller';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CryptographyModule } from '../crypto/crypto.module';
import { UseCasesModule } from '../use-cases/use-case.module';

@Module({
    imports: [
        PassportModule,
        UseCasesModule,
        CryptographyModule,
    ],
    controllers: [SessionController, CreateAccountController],

})
export class AuthModule { }
