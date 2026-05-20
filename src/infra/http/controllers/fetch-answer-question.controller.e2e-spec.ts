import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/services/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AnswerFactory } from "test/factories/make-answer";
import { QuestionFactory } from "test/factories/make-question";
import { StudentFactory } from "test/factories/make-student";
describe('fetch Answer question (E2E)', () => {
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

    it("[GET] /questions/:questionId/answers", async () => {
        const agent = request(app.getHttpServer())
        const user = await studentFactory.makePrisma()
        const question = await questionFactory.makePrisma({ authorId: user.id })
        const answerPromises = Array.from({ length: 3 }, () => {
            return answerFactory.makePrisma({ authorId: user.id, questionId: question.id })
        })
        const answers = await Promise.all(answerPromises)
        const token = jwtService.sign({ sub: user.id.toString() })
        const response = await agent.get(`/questions/${question.id}/answers`).set('Authorization', `Bearer ${token}`).send({
            content: 'Answer content'
        })

        expect(response.statusCode).toBe(200)

        const answersOnDatabase = await prismaService.answer.findMany({
            where: {
                questionId: question.id.toString()
            }
        })

        expect(answersOnDatabase.length).toBe(3)
    })
})