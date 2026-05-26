import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/services/prisma/prisma.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { QuestionFactory } from 'test/factories/make-question';
import { QuestionCommentFactory } from 'test/factories/make-question-comment';
import { StudentFactory } from 'test/factories/make-student';

describe('Fetch question comments (E2E)', () => {
    let app: INestApplication;
    let jwtService: JwtService;
    let studentFactory: StudentFactory;
    let questionFactory: QuestionFactory;
    let prismaService: PrismaService;
    let questionCommentFactory: QuestionCommentFactory;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [
                StudentFactory,
                QuestionFactory,
                QuestionCommentFactory,
                PrismaService,
            ],
        }).compile();

        app = moduleRef.createNestApplication();
        jwtService = app.get(JwtService);
        studentFactory = app.get(StudentFactory);
        questionFactory = app.get(QuestionFactory);
        questionCommentFactory = app.get(QuestionCommentFactory);
        prismaService = app.get(PrismaService);
        app.useGlobalPipes(
            new ValidationPipe({
                transform: true,
                whitelist: true, // optional but recommended
            }),
        );
        await app.init();
    });

    test('[GET] /comments/question/:questionId', async () => {
        const user = await studentFactory.makePrisma();
        const question = await questionFactory.makePrisma({ authorId: user.id });
        const questionCommentPromises = Array.from({ length: 8 }, () => {
            return questionCommentFactory.makePrisma({
                authorId: user.id,
                questionId: question.id,
            });
        });
        await Promise.all(questionCommentPromises);
        const agent = request(app.getHttpServer());

        const token = jwtService.sign({ sub: user.id.toString() });

        const response = await agent
            .get(`/comments/question/${question.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        const questionCommentsOnDatabase = await prismaService.comment.findMany({
            where: {
                questionId: question.id.toString(),
            },

        })

        expect(questionCommentsOnDatabase.length).toBe(8)
    });
});
