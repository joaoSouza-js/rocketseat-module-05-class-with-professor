import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from 'src/services/api-config/api-config.service';

@Module({
    providers: [ApiConfigService],
    exports: [ApiConfigService],
})
@Global()
export class ApiConfigModule { }
