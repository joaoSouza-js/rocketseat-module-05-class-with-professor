import { DatabaseModule } from '@/infra/database/modules/database/database.module';
import { PrismaModule } from '@/infra/database/modules/prisma/prisma.module';
import { CreateAccountController } from '@/infra/http/controllers/create-account.controller';
import { CreateQuestionController } from '@/infra/http/controllers/create-question.controller';
import { FetchQuestionController } from '@/infra/http/controllers/fetch-question.controller';
import { SessionController } from '@/infra/http/controllers/session.controller';
import { NestCreateQuestionUseCase } from '@/infra/http/use-cases/nest-create-question-use-case';
import { NestFetchLatestQuestionsUseCase } from '@/infra/http/use-cases/nest-fetch-latest-questions-use-case';
import { HasherService } from '@/services/hasher/hasher.service';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [
        CreateAccountController,
        CreateQuestionController,
        FetchQuestionController,
        SessionController,
    ],
    imports: [PrismaModule, DatabaseModule],
    providers: [HasherService, JwtService, NestCreateQuestionUseCase, NestFetchLatestQuestionsUseCase],
})
export class HttpModule { }
