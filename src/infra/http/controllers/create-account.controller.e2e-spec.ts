import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/services/prisma/prisma.service';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Create account controller (e2e)', () => {

    let app: INestApplication;
    let prismaService: PrismaService
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        prismaService = app.get(PrismaService)
        await app.init();
    });

    test('[POST] /accounts', async () => {
        const agent = request(app.getHttpServer())
        const response = await agent.post('/accounts').send({
            name: 'John Doe',
            email: 'joe@me.com',
            password: '123456',
        })

        expect(response.statusCode).toBe(201)

        const user = await prismaService.user.findUnique({
            where: {
                email: 'joe@me.com'
            }
        })

        expect(user).toBeDefined()

    });
});
