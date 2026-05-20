import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/services/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AnswerFactory } from "test/factories/make-answer";
import { QuestionFactory } from "test/factories/make-question";
import { StudentFactory } from "test/factories/make-student";
describe('Answer question (E2E)', () => {
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

    it("[PUT] /answers/:answerId", async () => {
        const agent = request(app.getHttpServer())
        const user = await studentFactory.makePrisma()
        const question = await questionFactory.makePrisma({ authorId: user.id })
        const answer = await answerFactory.makePrisma({ authorId: user.id, questionId: question.id })
        const token = jwtService.sign({ sub: user.id.toString() })
        const response = await agent.put(`/answers/${answer.id.toString()}`).set('Authorization', `Bearer ${token}`).send({
            content: 'Answer content'
        })

        expect(response.statusCode).toBe(204)

        const answerOnDatabase = await prismaService.answer.findUnique({
            where: {
                id: answer.id.toString()
            }
        })

        expect(answerOnDatabase?.content).toEqual('Answer content')
    })
})