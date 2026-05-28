import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/services/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AnswerFactory } from "test/factories/make-answer";
import { QuestionFactory } from "test/factories/make-question";
import { StudentFactory } from "test/factories/make-student";

describe('Best answer question (E2E)', () => {
    let app: INestApplication;
    let jwtService: JwtService
    let studentFactory: StudentFactory
    let questionFactory: QuestionFactory
    let answerFactory: AnswerFactory
    let prismaService: PrismaService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [StudentFactory, QuestionFactory, AnswerFactory]
        }).compile();

        app = moduleRef.createNestApplication();
        jwtService = app.get(JwtService)
        studentFactory = app.get(StudentFactory)
        questionFactory = app.get(QuestionFactory)
        prismaService = app.get(PrismaService)
        answerFactory = app.get(AnswerFactory)
        await app.init();
    })

    it('[GET] /answers/:answerId/best', async () => {
        const user = await studentFactory.makePrisma()
        const question = await questionFactory.makePrisma({ authorId: user.id })
        const answer = await answerFactory.makePrisma({ authorId: user.id, questionId: question.id })
        const agent = request(app.getHttpServer());
        const token = jwtService.sign({ sub: user.id.toString() })
        const response = await agent.patch(`/answers/${answer.id.toString()}/best`).set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(204)

        const answerOnDatabase = await prismaService.question.findUnique({
            where: {
                id: question.id.toString()
            }
        })

        expect(answerOnDatabase?.bestAnswerId).toEqual(answer.id.toString())
    })
})