import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/services/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { QuestionFactory } from 'test/factories/make-question';
import { StudentFactory } from 'test/factories/make-student';

describe('Create question comment (E2E)', () => {
    let app: INestApplication;
    let prismaService: PrismaService
    let jwtService: JwtService
    let studentFactory: StudentFactory
    let questionFactory: QuestionFactory

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [StudentFactory, QuestionFactory]
        }).compile();

        app = moduleRef.createNestApplication();
        prismaService = app.get(PrismaService)
        jwtService = app.get(JwtService)
        studentFactory = app.get(StudentFactory)
        questionFactory = app.get(QuestionFactory)
        await app.init();
    });

    test('[POST] /questions/:questionId/comments', async () => {
        const agent = request(app.getHttpServer());
        const user = await studentFactory.makePrisma()
        const question = await questionFactory.makePrisma({ authorId: user.id })

        const token = jwtService.sign({
            sub: user.id.toString()
        })

        const response = await agent
            .post(`/questions/${question.id}/comments`)
            .send({
                content: 'comment content'
            })
            .set('Authorization', `Bearer ${token}`);



        expect(response.statusCode).toBe(201);

        const questionCommentCreated = await prismaService.comment.findUnique({
            where: {
                id: question.id.toString()
            }
        })

        expect(questionCommentCreated).toBeDefined()
    });
});
