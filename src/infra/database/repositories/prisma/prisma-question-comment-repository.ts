import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { QuestionCommentRepository } from "@/domain/forum/application/repositories/question-comment-repository";
import type { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaQuestionCommentRepository
    implements QuestionCommentRepository {
    findById(questionCommentId: UniqueEntityId): Promise<QuestionComment | null> {
        const questionComment = this.questionComments.find((questionComment) =>
            questionComment.id.equals(questionCommentId),
        );
        return Promise.resolve(questionComment || null);
    }
    questionComments: QuestionComment[] = [];

    findManyByQuestionId(
        questionId: UniqueEntityId,
        params: PaginationParams,
    ): Promise<QuestionComment[]> {
        const { page = 1, limit = 10 } = params;
        const questionsComment = this.questionComments
            .filter((questionComment) => {
                return questionComment.questionId.equals(questionId);
            })
            .slice((page - 1) * page, page * limit);

        return Promise.resolve(questionsComment);
    }
    save(questionComment: QuestionComment): Promise<void> {
        this.questionComments.push(questionComment);
        return Promise.resolve();
    }
    delete(QuestionComment: QuestionComment): Promise<void> {
        const questionCommentIndex = this.questionComments.findIndex(
            (questionComment) => {
                return questionComment.id.equals(QuestionComment.id);
            },
        );

        this.questionComments.splice(questionCommentIndex, 1);
        return Promise.resolve();
    }
}
