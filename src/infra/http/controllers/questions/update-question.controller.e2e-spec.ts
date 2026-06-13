import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/services/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AttachmentFactory } from 'test/factories/make-attachment';
import { QuestionFactory } from 'test/factories/make-question';
import { QuestionAttachmentFactory } from 'test/factories/make-question-attachment';
import { StudentFactory } from 'test/factories/make-student';

describe('Update question (E2E)', () => {
    let app: INestApplication;
    let questionFactory: QuestionFactory;
    let studentFactory: StudentFactory;
    let jwtService: JwtService;
    let prismaService: PrismaService;
    let questionAttachmentFactory: QuestionAttachmentFactory;
    let attachmentFactory: AttachmentFactory;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [
                QuestionFactory,
                StudentFactory,
                QuestionAttachmentFactory,
                AttachmentFactory,
            ],
        }).compile();

        app = moduleRef.createNestApplication();
        questionFactory = moduleRef.get(QuestionFactory);
        studentFactory = moduleRef.get(StudentFactory);
        jwtService = app.get(JwtService);
        prismaService = app.get(PrismaService);
        questionAttachmentFactory = app.get(QuestionAttachmentFactory);
        attachmentFactory = app.get(AttachmentFactory);

        await app.init();
    });

    it('[PUT] /questions/:questionId', async () => {
        const agent = request(app.getHttpServer());
        const user = await studentFactory.makePrisma();
        const question = await questionFactory.makePrisma({ authorId: user.id });
        const questionId = question.id.toString();

        const questionAttachmentsPromise = Array.from({ length: 3 }, () => {
            return questionAttachmentFactory.makePrisma({
                questionId: question.id,
            });
        });

        const attachmentsPromise = Array.from({ length: 2 }, () => {
            return attachmentFactory.makePrisma();
        });


        const questionAttachments = await Promise.all(questionAttachmentsPromise);
        const newAttachments = await Promise.all(attachmentsPromise);

        const newAttachmentsIds = newAttachments.map(attachment => attachment.id.toString());

        const attachmentsIds = [questionAttachments[0].id.toString(), ...newAttachmentsIds];

        const token = jwtService.sign({ sub: user.id.toString() });

        const response = await agent
            .put(`/questions/${questionId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'question title',
                content: 'question content',
                attachmentsIds,
            });

        expect(response.statusCode).toBe(204);
        const questionOnDatabase = await prismaService.question.findUnique({
            where: {
                id: questionId,
            },
        });

        expect(questionOnDatabase?.title).toEqual('question title');
        expect(questionOnDatabase?.content).toEqual('question content');

        const questionAttachmentsOnDatabase = await prismaService.attachment.findMany({
            where: {
                questionId: questionId,
            },
        });

        expect(questionAttachmentsOnDatabase).toHaveLength(3);
        expect(questionAttachmentsOnDatabase).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: questionAttachments[0].id.toString(),
                })
            ])
        )
    });
});
