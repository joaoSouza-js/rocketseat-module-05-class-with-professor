import { AppModule } from '@/infra/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { QuestionFactory } from 'test/factories/make-question';
import { StudentFactory } from 'test/factories/make-student';

describe('Fetch question (E2E)', () => {
    let app: INestApplication;
    let jwtService: JwtService
    let studentFactory: StudentFactory
    let questionFactory: QuestionFactory

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [StudentFactory, QuestionFactory]
        }).compile();

        app = moduleRef.createNestApplication();
        jwtService = app.get(JwtService)
        studentFactory = app.get(StudentFactory)
        questionFactory = app.get(QuestionFactory)
        app.useGlobalPipes(
            new ValidationPipe({
                transform: true,
                whitelist: true, // optional but recommended
            }),
        )
        await app.init();
    });

    test('[GET] /questions', async () => {
        const user = await studentFactory.makePrisma()
        const questionsPromises = Array.from({ length: 8 }, () => {
            return questionFactory.makePrisma({ authorId: user.id })
        })
        await Promise.all(questionsPromises)
        const agent = request(app.getHttpServer());

        const token = jwtService.sign({ sub: user.id.toString() })

        const response = await agent.get('/questions').set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)

        expect(response.body.questions).toHaveLength(8)


    })

})