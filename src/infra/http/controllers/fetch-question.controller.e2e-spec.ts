import { AppModule } from '@/infra/app.module';
import { HasherService } from '@/services/hasher/hasher.service';
import { PrismaService } from '@/services/prisma/prisma.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { createPrismaQuestion } from 'test/create-prisma-question';
import { createPrismaUser } from 'test/create-prisma-user';

describe('Fetch question (E2E)', () => {
    let app: INestApplication;
    let prismaService: PrismaService
    let jwtService: JwtService
    let hashService: HasherService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        prismaService = app.get(PrismaService)
        jwtService = app.get(JwtService)
        hashService = app.get(HasherService)

        app.useGlobalPipes(
            new ValidationPipe({
                transform: true,
                whitelist: true, // optional but recommended
            }),
        )
        await app.init();
    });

    test('[GET] /questions', async () => {
        const questionsPromises = Array.from({ length: 8 }, () => {
            return createPrismaQuestion(prismaService)
        })
        const questions = await Promise.all(questionsPromises)
        const user = await createPrismaUser({ prismaService, hashService: hashService })
        const agent = request(app.getHttpServer());

        const token = jwtService.sign({ sub: user.id })

        const response = await agent.get('/questions').set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)

        expect(response.body.questions).toHaveLength(8)


    })

})