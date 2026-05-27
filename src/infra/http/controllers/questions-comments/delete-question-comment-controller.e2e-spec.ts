import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/services/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { QuestionFactory } from 'test/factories/make-question';
import { QuestionCommentFactory } from 'test/factories/make-question-comment';
import { StudentFactory } from 'test/factories/make-student';

describe('Delete question comment (E2E)', () => {
    let app: INestApplication;
    let prismaService: PrismaService
    let jwtService: JwtService
    let studentFactory: StudentFactory
    let questionFactory: QuestionFactory
    let questionCommentFactory: QuestionCommentFactory
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [StudentFactory, QuestionFactory, QuestionCommentFactory]
        }).compile();

        app = moduleRef.createNestApplication();
        prismaService = app.get(PrismaService)
        jwtService = app.get(JwtService)
        studentFactory = app.get(StudentFactory)
        questionFactory = app.get(QuestionFactory)
        questionCommentFactory = app.get(QuestionCommentFactory)
        await app.init();
    });

    test('[DELETE] comments/:commentId/questions', async () => {
        const agent = request(app.getHttpServer());
        const user = await studentFactory.makePrisma()
        const question = await questionFactory.makePrisma({ authorId: user.id })
        const questionComment = await questionCommentFactory.makePrisma({ authorId: user.id, questionId: question.id })
        const token = jwtService.sign({
            sub: user.id.toString()
        })


        const response = await agent
            .delete(`/comments/${questionComment.id.toString()}/questions`)
            .set('Authorization', `Bearer ${token}`);


        expect(response.statusCode).toBe(204);

        const questionCommentCreated = await prismaService.comment.findUnique({
            where: {
                id: question.id.toString()
            }
        })

        expect(questionCommentCreated).toBeDefined()
    });
});
