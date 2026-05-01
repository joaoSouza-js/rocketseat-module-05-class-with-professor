import { CreateQuestionController } from '@/infra/http/controllers/create-question.controller';
import { FetchQuestionController } from '@/infra/http/controllers/fetch-question.controller';
import { HasherService } from '@/services/hasher/hasher.service';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UseCasesModule } from '../use-cases/use-case.module';

@Module({
    controllers: [
        CreateQuestionController,
        FetchQuestionController,
    ],
    imports: [
        UseCasesModule,
        AuthModule
    ],
    providers: [HasherService]
})
export class HttpModule { }
