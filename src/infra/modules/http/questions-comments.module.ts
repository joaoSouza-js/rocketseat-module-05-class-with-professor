import { CreateQuestionCommentController } from "@/infra/http/controllers/create-question-comment-controller";
import { DeleteQuestionCommentController } from "@/infra/http/controllers/delete-question-comment-controller";
import { FetchQuestionCommentsController } from "@/infra/http/controllers/fetch-question-comments.controller";
import { Module } from "@nestjs/common";
import { UseCasesModule } from "../use-cases/use-case.module";

@Module({
    imports: [UseCasesModule],
    controllers: [
        CreateQuestionCommentController,
        DeleteQuestionCommentController,
        FetchQuestionCommentsController,
    ],
})
export class QuestionsCommentsModule { }