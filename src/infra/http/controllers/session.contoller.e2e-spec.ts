import { AppModule } from '@/infra/app.module';
import { HasherService } from '@/services/hasher/hasher.service';
import { PrismaService } from '@/services/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { createPrismaUser } from 'test/create-prisma-user';

describe('Create account controller (e2e)', () => {

    let app: INestApplication;
    let prismaService: PrismaService
    let hashService: HasherService
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        prismaService = app.get(PrismaService)
        hashService = app.get(HasherService)
        await app.init();
    });

    test('[POST] /accounts', async () => {
        const agent = request(app.getHttpServer())

        const user = await createPrismaUser({
            prismaService,
            hashService,

        })

        const response = await agent.post("/sessions").send({
            email: user.email,
            password: user.password
        })


        expect(response.statusCode).toBe(201)

        expect(response.body.access_token).toEqual(expect.any(String))

    });
});
