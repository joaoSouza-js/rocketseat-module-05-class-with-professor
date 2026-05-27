import { CreateAnswerCommentController } from "@/infra/http/controllers/answers-comments/create-answer-comment-controller";
import { DeleteAnswerCommentController } from "@/infra/http/controllers/answers-comments/delete-answer-comment-controller";
import { FetchAnswerCommentsController } from "@/infra/http/controllers/answers-comments/fetch-answer-comments.controller";
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