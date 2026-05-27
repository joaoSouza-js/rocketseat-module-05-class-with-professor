import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/services/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AnswerFactory } from 'test/factories/make-answer';
import { AnswerCommentFactory } from 'test/factories/make-answer-comment';
import { QuestionFactory } from 'test/factories/make-question';
import { StudentFactory } from 'test/factories/make-student';

describe('Delete answer comment (E2E)', () => {
    let app: INestApplication;
    let prismaService: PrismaService
    let jwtService: JwtService
    let studentFactory: StudentFactory
    let answerFactory: AnswerFactory
    let questionFactory: QuestionFactory
    let answerCommentFactory: AnswerCommentFactory
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [StudentFactory, AnswerFactory, AnswerCommentFactory, QuestionFactory]
        }).compile();

        app = moduleRef.createNestApplication();
        prismaService = app.get(PrismaService)
        jwtService = app.get(JwtService)
        studentFactory = app.get(StudentFactory)
        answerFactory = app.get(AnswerFactory)
        answerCommentFactory = app.get(AnswerCommentFactory)
        questionFactory = app.get(QuestionFactory)
        await app.init();
    });

    test('[DELETE] comments/:commentId/answers', async () => {
        const agent = request(app.getHttpServer());
        const user = await studentFactory.makePrisma()
        const question = await questionFactory.makePrisma({ authorId: user.id })
        const answer = await answerFactory.makePrisma({ authorId: user.id, questionId: question.id })
        const answerComment = await answerCommentFactory.makePrisma({ authorId: user.id, answerId: answer.id })


        const token = jwtService.sign({
            sub: user.id.toString()
        })


        const response = await agent
            .delete(`/comments/${answerComment.id.toString()}/answers`)
            .set('Authorization', `Bearer ${token}`);


        expect(response.statusCode).toBe(204);

        const answerCommentCreated = await prismaService.comment.findUnique({
            where: {
                id: answer.id.toString()
            }
        })

        expect(answerCommentCreated).toBeDefined()
    });
});
