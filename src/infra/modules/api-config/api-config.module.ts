import { ApiConfigService } from '@/infra/services/api-config/api-config.service';
import { Global, Module } from '@nestjs/common';

@Module({
    providers: [ApiConfigService],
    exports: [ApiConfigService],
})
@Global()
export class ApiConfigModule { }
