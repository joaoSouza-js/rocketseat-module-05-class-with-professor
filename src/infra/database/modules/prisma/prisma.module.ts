import { ApiConfigService } from '@/infra/services/api-config/api-config.service';
import { PrismaService } from '@/infra/services/prisma/prisma.service';
import { Global, Module } from '@nestjs/common';

@Module({
    providers: [PrismaService, ApiConfigService],
    exports: [PrismaService],
})
@Global()
export class PrismaModule { }
