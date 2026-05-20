import { AppModule } from "@/infra/app.module";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from 'supertest';
import { QuestionFactory } from "test/factories/make-question";
import { StudentFactory } from "test/factories/make-student";

describe("Fetch question by slug (E2E)", () => {
    let app: INestApplication;
    let jwtService: JwtService
    let questionFactory: QuestionFactory
    let studentFactory: StudentFactory

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [StudentFactory, QuestionFactory]
        }).compile();

        app = moduleRef.createNestApplication()
        jwtService = app.get(JwtService)
        studentFactory = app.get(StudentFactory)
        questionFactory = app.get(QuestionFactory)
        await app.init();

    })

    it('[GET] /questions/:slug', async () => {
        const agent = request(app.getHttpServer());
        const user = await studentFactory.makePrisma()
        const questionPromises = Array.from({ length: 3 }, () => {
            return questionFactory.makePrisma({ authorId: user.id })
        })
        const questions = await Promise.all(questionPromises)
        const token = jwtService.sign({ sub: "1" })

        const question = questions[0]

        const response = await agent
            .get(`/questions/${question.slug.value}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBe(question.id.toString())



    })
});