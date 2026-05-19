import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { CreateQuestionController } from '@/infra/http/controllers/create-question.controller';
import { FetchQuestionController } from '@/infra/http/controllers/fetch-question.controller';
import { FindQuestionBySlugController } from '@/infra/http/controllers/find-question-by-slug';
import { HasherService } from '@/infra/services/hasher/hasher.service';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import { UseCasesModule } from '../use-cases/use-case.module';

@Module({
    controllers: [
        CreateQuestionController,
        FetchQuestionController,
        FindQuestionBySlugController
    ],
    imports: [
        UseCasesModule,
        AuthModule
    ],
    providers: [HasherService, {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
    }]
})
export class HttpModule { }
