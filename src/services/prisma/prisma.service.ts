import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from 'src/generated/prisma/client';
import { ApiConfigService } from '../api-config/api-config.service';


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    constructor(apiConfigService: ApiConfigService) {
        const adapter = new PrismaPg({
            connectionString: apiConfigService.databaseUrl,


        }, {
            schema: apiConfigService.schemaId
        })
        super({
            adapter,
            log: ["error", "warn"],
        })
    }
    onModuleInit() {
        return this.$connect()
    }
    onModuleDestroy() {
        return this.$disconnect()
    }



}
