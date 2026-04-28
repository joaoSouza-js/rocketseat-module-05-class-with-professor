import { CreateAccountController } from '@/infra/http/controllers/create-account.controller';
import { CreateQuestionController } from '@/infra/http/controllers/create-question.controller';
import { FetchQuestionController } from '@/infra/http/controllers/fetch-question.controller';
import { SessionController } from '@/infra/http/controllers/session.controller';
import { HasherService } from '@/services/hasher/hasher.service';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UseCasesModule } from '../use-cases/use-case.module';

@Module({
    controllers: [
        CreateAccountController,
        CreateQuestionController,
        FetchQuestionController,
        SessionController,
    ],
    imports: [UseCasesModule],
    providers: [HasherService, JwtService],
})
export class HttpModule { }
