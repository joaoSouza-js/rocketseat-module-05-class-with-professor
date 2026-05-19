import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/services/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { QuestionFactory } from 'test/factories/make-question';
import { StudentFactory } from 'test/factories/make-student';

describe('Create question (E2E)', () => {
    let app: INestApplication;
    let prismaService: PrismaService
    let jwtService: JwtService
    let studentFactory: StudentFactory

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [StudentFactory, QuestionFactory]
        }).compile();

        app = moduleRef.createNestApplication();
        prismaService = app.get(PrismaService)
        jwtService = app.get(JwtService)
        studentFactory = app.get(StudentFactory)
        await app.init();
    });

    test('[POST] /questions', async () => {
        const agent = request(app.getHttpServer());
        const user = await studentFactory.makePrisma()
        const question = {
            title: 'question title',
            content: 'question content',
        };

        const token = jwtService.sign({
            sub: user.id.toString()
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
