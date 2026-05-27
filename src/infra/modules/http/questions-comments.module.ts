import { CreateQuestionCommentController } from "@/infra/http/controllers/questions-comments/create-question-comment-controller";
import { DeleteQuestionCommentController } from "@/infra/http/controllers/questions-comments/delete-question-comment-controller";
import { FetchQuestionCommentsController } from "@/infra/http/controllers/questions-comments/fetch-question-comments.controller";
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