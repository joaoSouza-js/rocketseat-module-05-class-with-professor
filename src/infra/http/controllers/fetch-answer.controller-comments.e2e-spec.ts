import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/services/prisma/prisma.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AnswerFactory } from 'test/factories/make-answer';
import { AnswerCommentFactory } from 'test/factories/make-answer-comment';
import { QuestionFactory } from 'test/factories/make-question';
import { StudentFactory } from 'test/factories/make-student';

describe('Fetch answer comments (E2E)', () => {
    let app: INestApplication;
    let jwtService: JwtService;
    let studentFactory: StudentFactory;
    let answerFactory: AnswerFactory;
    let prismaService: PrismaService;
    let answerCommentFactory: AnswerCommentFactory;
    let questionFactory: QuestionFactory

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [
                StudentFactory,
                AnswerFactory,
                AnswerCommentFactory,
                QuestionFactory,
                PrismaService,
            ],
        }).compile();

        app = moduleRef.createNestApplication();
        jwtService = app.get(JwtService);
        studentFactory = app.get(StudentFactory);
        answerFactory = app.get(AnswerFactory);
        answerCommentFactory = app.get(AnswerCommentFactory);
        questionFactory = app.get(QuestionFactory)
        prismaService = app.get(PrismaService);
        app.useGlobalPipes(
            new ValidationPipe({
                transform: true,
                whitelist: true, // optional but recommended
            }),
        );
        await app.init();
    });

    test('[GET] /comments/answer/:answerId', async () => {
        const user = await studentFactory.makePrisma();
        const question = await questionFactory.makePrisma({ authorId: user.id });
        const answer = await answerFactory.makePrisma({ authorId: user.id, questionId: question.id });
        const answerCommentPromises = Array.from({ length: 8 }, () => {
            return answerCommentFactory.makePrisma({
                authorId: user.id,
                answerId: answer.id,
            });
        });
        await Promise.all(answerCommentPromises);
        const agent = request(app.getHttpServer());

        const token = jwtService.sign({ sub: user.id.toString() });

        const response = await agent
            .get(`/comments/answer/${answer.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        const answerCommentsOnDatabase = await prismaService.comment.findMany({
            where: {
                answerId: answer.id.toString(),
            },

        })

        expect(answerCommentsOnDatabase.length).toBe(8)
    });
});
