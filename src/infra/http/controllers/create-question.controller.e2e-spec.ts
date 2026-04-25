import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/services/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Create question (E2E)', () => {
    let app: INestApplication;
    let prismaService: PrismaService
    let jwtService: JwtService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        prismaService = app.get(PrismaService)
        jwtService = app.get(JwtService)
        await app.init();
    });

    test('[POST] /questions', async () => {
        const agent = request(app.getHttpServer());
        const user = await prismaService.user.create({
            data: {
                name: 'John Doe',
                email: 'joe@me.com',
                password: '123456',
            },
        })
        const question = {
            title: 'question title',
            content: 'question content',
        };

        const token = jwtService.sign({
            sub: user.id
        })


        const response = await agent
            .post('/questions')
            .send(question)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(201);

        const questionCreated = await prismaService.question.findUnique({
            where: {
                slug: response.body.slug
            }
        })

        expect(questionCreated).toBeDefined()
    });
});
