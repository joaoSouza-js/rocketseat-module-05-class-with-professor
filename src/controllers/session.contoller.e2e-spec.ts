import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { createUserTestRequest } from 'test/crate-user-test-request';

describe('Create account controller (e2e)', () => {

    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();

        await app.init();
    });

    test('[POST] /accounts', async () => {
        const agent = request(app.getHttpServer())
        const userRequest = await createUserTestRequest(agent)

        const response = await agent.post("/sessions").send({
            email: userRequest.email,
            password: userRequest.password
        })


        expect(response.statusCode).toBe(201)

        expect(response.body.access_token).toEqual(expect.any(String))

    });
});
