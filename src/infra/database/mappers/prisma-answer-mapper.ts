import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Answer } from "@/domain/forum/enterprise/entities/answer"
import { AnswerAttachmentList } from "@/domain/forum/enterprise/entities/answer-attachment-list"
import { AnswerModel } from "@/generated/prisma/models"

export class PrismaAnswerMapper {
    static toDomain(answerModel: AnswerModel): Answer {
        const answerIdUnique = UniqueEntityId.fromString(answerModel.id)
        const authorId = UniqueEntityId.fromString(answerModel.authorId)
        const answer = Answer.rehydrate(
            {
                authorId,
                content: answerModel.content,
                createdAt: answerModel.createdAt,
                questionId: UniqueEntityId.fromString(answerModel.questionId),
                attachments: new AnswerAttachmentList(),
            },
            answerIdUnique
        )

        return answer
    }

    static toPersistence(answer: Answer): AnswerModel {
        const answerModel: AnswerModel = {
            id: answer.id.toString(),
            authorId: answer.authorId.toString(),
            content: answer.content,
            createdAt: answer.createdAt,
            updatedAt: answer.updatedAt ?? null,
            questionId: answer.questionId.toString(),
        }

        return answerModel
    }


}