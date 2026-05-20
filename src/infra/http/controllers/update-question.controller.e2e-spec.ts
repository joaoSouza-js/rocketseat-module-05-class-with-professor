import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/services/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { QuestionFactory } from "test/factories/make-question";
import { StudentFactory } from "test/factories/make-student";

describe("Update question (E2E)", () => {
    let app: INestApplication
    let questionFactory: QuestionFactory
    let studentFactory: StudentFactory
    let jwtService: JwtService
    let prismaService: PrismaService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [QuestionFactory, StudentFactory]
        }).compile();

        app = moduleRef.createNestApplication()
        questionFactory = moduleRef.get(QuestionFactory)
        studentFactory = moduleRef.get(StudentFactory)
        jwtService = app.get(JwtService)
        prismaService = app.get(PrismaService)
        await app.init();
    })

    it('[PUT] /questions/:questionId', async () => {
        const agent = request(app.getHttpServer());
        const user = await studentFactory.makePrisma()
        const question = await questionFactory.makePrisma({ authorId: user.id })
        const questionId = question.id.toString()

        const token = jwtService.sign({ sub: user.id.toString() })

        const response = await agent.put(`/questions/${questionId}`).set('Authorization', `Bearer ${token}`).send({
            title: 'question title',
            content: 'question content',
        })

        expect(response.statusCode).toBe(204)
        const questionOnDatabase = await prismaService.question.findUnique({
            where: {
                id: questionId
            }
        })

        expect(questionOnDatabase?.title).toEqual('question title')
        expect(questionOnDatabase?.content).toEqual('question content')


    })
})