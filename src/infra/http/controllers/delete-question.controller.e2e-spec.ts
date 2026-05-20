import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/services/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { QuestionFactory } from 'test/factories/make-question';
import { StudentFactory } from 'test/factories/make-student';

describe('Delete question (E2E)', () => {
    let app: INestApplication;
    let jwtService: JwtService
    let studentFactory: StudentFactory
    let questionFactory: QuestionFactory
    let prismaService: PrismaService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [StudentFactory, QuestionFactory]
        }).compile();

        app = moduleRef.createNestApplication();
        jwtService = app.get(JwtService)
        studentFactory = app.get(StudentFactory)
        questionFactory = app.get(QuestionFactory)
        prismaService = app.get(PrismaService)
        await app.init();
    });

    test('[GET] /delete', async () => {
        const user = await studentFactory.makePrisma()
        const question = await questionFactory.makePrisma({ authorId: user.id })
        const agent = request(app.getHttpServer());

        const token = jwtService.sign({ sub: user.id.toString() })

        const response = await agent.delete(`/questions/${question.id}`).set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(204)

        const questionOnDatabase = await prismaService.question.findUnique({
            where: {
                id: question.id.toString()
            }
        })
        expect(questionOnDatabase).toBeNull()




    })

})