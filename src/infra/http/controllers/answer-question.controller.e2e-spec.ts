import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/services/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { QuestionFactory } from "test/factories/make-question";
import { StudentFactory } from "test/factories/make-student";

describe('Answer question (E2E)', () => {
    let app: INestApplication;
    let prismaService: PrismaService
    let jwtService: JwtService
    let questionFactory: QuestionFactory
    let studentFactory: StudentFactory

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [StudentFactory, QuestionFactory]
        }).compile();

        app = moduleRef.createNestApplication();
        prismaService = app.get(PrismaService)
        jwtService = app.get(JwtService)
        questionFactory = app.get(QuestionFactory)
        studentFactory = app.get(StudentFactory)
        await app.init();
    });

    test('[POST] /questions/:questionId/answers', async () => {
        const agent = request(app.getHttpServer())
        const user = await studentFactory.makePrisma()
        const question = await questionFactory.makePrisma({ authorId: user.id })
        const token = jwtService.sign({ sub: user.id.toString() })
        const response = await agent.post(`/questions/${question.id}/answers`).set('Authorization', `Bearer ${token}`).send({
            content: 'Answer content'
        })
        expect(response.statusCode).toBe(201)

        const answerOnDatabase = await prismaService.answer.findUnique({
            where: {
                id: response.body.answer.id
            }
        })

        expect(answerOnDatabase).toBeTruthy()
    })
})