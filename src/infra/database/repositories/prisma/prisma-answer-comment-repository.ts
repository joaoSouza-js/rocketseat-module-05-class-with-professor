import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comment-repository";
import type { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaAnswerCommentRepository
    implements AnswerCommentRepository {
    findById(answerCommentId: UniqueEntityId): Promise<AnswerComment | null> {
        const answerComment = this.answerComments.find((answerComment) => {
            return answerComment.id.equals(answerCommentId);
        });
        return Promise.resolve(answerComment || null);
    }
    answerComments: AnswerComment[] = [];

    findManyByAnswerId(
        answerId: UniqueEntityId,
        params: PaginationParams,
    ): Promise<AnswerComment[]> {
        const { page = 1, limit = 10 } = params;
        const answersComment = this.answerComments
            .filter((answerComment) => {
                return answerComment.answerId.equals(answerId);
            })
            .slice((page - 1) * page, page * limit);
        return Promise.resolve(answersComment);
    }
    save(answerComment: AnswerComment): Promise<void> {
        this.answerComments.push(answerComment);
        return Promise.resolve();
    }
    delete(AnswerComment: AnswerComment): Promise<void> {
        const answerCommentIndex = this.answerComments.findIndex(
            (answerComment) => {
                return answerComment.id.equals(AnswerComment.id);
            },
        );

        this.answerComments.splice(answerCommentIndex, 1);
        return Promise.resolve();
    }
}
