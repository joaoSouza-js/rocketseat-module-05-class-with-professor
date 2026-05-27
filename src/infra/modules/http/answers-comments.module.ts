import { CreateAnswerCommentController } from "@/infra/http/controllers/create-answer-comment-controller";
import { DeleteAnswerCommentController } from "@/infra/http/controllers/delete-answer-comment-controller";
import { FetchAnswerCommentsController } from "@/infra/http/controllers/fetch-answer-comments.controller";
import { Module } from "@nestjs/common";
import { UseCasesModule } from "../use-cases/use-case.module";

@Module({
    imports: [UseCasesModule],
    controllers: [
        CreateAnswerCommentController,
        DeleteAnswerCommentController,
        FetchAnswerCommentsController,
    ],
})
export class AnswersCommentsModule { }