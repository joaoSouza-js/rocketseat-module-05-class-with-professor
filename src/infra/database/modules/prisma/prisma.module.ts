import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from 'src/services/api-config/api-config.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
    providers: [PrismaService, ApiConfigService],
    exports: [PrismaService],
})
@Global()
export class PrismaModule { }
