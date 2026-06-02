import { AppModule } from "@/infra/app.module";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import path from "path";
import request from 'supertest';
import { StudentFactory } from "test/factories/make-student";

describe("Fetch question by slug (E2E)", () => {
    let app: INestApplication;
    let jwtService: JwtService

    let studentFactory: StudentFactory

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [StudentFactory,]
        }).compile();

        app = moduleRef.createNestApplication()
        jwtService = app.get(JwtService)
        studentFactory = app.get(StudentFactory)
        await app.init();

    })

    it('[POST] /attachments/upload', async () => {
        const agent = request(app.getHttpServer());
        const user = await studentFactory.makePrisma()


        const token = jwtService.sign({ sub: user.id.toString() })

        const filePath = path.resolve(
            __dirname,
            '../../../../test/e2e/sample-image.jpg',
        )



        const response = await agent
            .post("/attachments/upload")
            .attach("file", filePath)
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(201);



    })
});