import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/services/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AttachmentFactory } from 'test/factories/make-attachment';
import { QuestionFactory } from 'test/factories/make-question';
import { StudentFactory } from 'test/factories/make-student';

describe('Create question (E2E)', () => {
    let app: INestApplication;
    let prismaService: PrismaService
    let jwtService: JwtService
    let studentFactory: StudentFactory
    let attachmentFactory: AttachmentFactory
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [StudentFactory, QuestionFactory, AttachmentFactory]
        }).compile();

        app = moduleRef.createNestApplication();
        prismaService = app.get(PrismaService)
        jwtService = app.get(JwtService)
        studentFactory = app.get(StudentFactory)
        attachmentFactory = app.get(AttachmentFactory)
        await app.init();
    });

    test('[POST] /questions', async () => {
        const agent = request(app.getHttpServer());
        const user = await studentFactory.makePrisma()
        const attachmentsPromise = Array.from({ length: 3 }, () => {
            return attachmentFactory.makePrisma()
        })

        const attachments = await Promise.all(attachmentsPromise)
        const attachmentsId = attachments.map(attachment => attachment.id.toString())



        const question = {
            title: 'question title',
            content: 'question content',
            attachmentsIds: attachmentsId
        };

        const token = jwtService.sign({
            sub: user.id.toString()
        })


        const response = await agent
            .post('/questions')
            .send(question)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(201);

        const questionCreated = await prismaService.question.findUnique({
            where: {
                slug: response.body.slug
            }
        })

        expect(questionCreated).toBeDefined()


        const attachmentsOnDatabase = await prismaService.attachment.findMany({
            where: {
                questionId: questionCreated?.id
            }
        })

        console.log(attachmentsOnDatabase)

        expect(attachmentsOnDatabase).toHaveLength(3)
    });
});
