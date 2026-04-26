import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Question } from "@/domain/forum/enterprise/entities/question"
import { QuestionAttachmentList } from "@/domain/forum/enterprise/entities/question-attachment-list"
import { SlugValueObject } from "@/domain/forum/enterprise/value-object/slug-value-object"
import { Prisma } from "@/generated/prisma/client"
import { QuestionModel, QuestionUpdateInput } from "@/generated/prisma/models"

export class PrismaQuestionMapper {
    static toDomain(questionModel: QuestionModel): Question {
        const questionIdUnique = UniqueEntityId.fromString(questionModel.id)
        const authorId = UniqueEntityId.fromString(questionModel.authorId)
        const slug = SlugValueObject.fromString(questionModel.slug)
        const bestAnswerId = questionModel.bestAnswerId ? UniqueEntityId.fromString(questionModel.bestAnswerId) : null
        const question = Question.rehydrate(
            {
                title: questionModel.title,
                authorId,
                content: questionModel.content,
                createdAt: questionModel.createdAt,
                slug,
                bestAnswerId: bestAnswerId,
                attachments: new QuestionAttachmentList(),
            },
            questionIdUnique
        )

        return question
    }

    static toPersistence(question: Question): QuestionModel {
        const questionModel = {
            id: question.id.toString(),
            authorId: question.authorId.toString(),
            title: question.title,
            content: question.content,
            slug: question.slug.value,
            bestAnswerId: question.bestAnswerId
                ? question.bestAnswerId.toString()
                : null,
            createdAt: question.createdAt,
            updatedAt: question.updatedAt ?? null
        }

        return questionModel
    }

    static toUpdatePersistence(question: Question): QuestionUpdateInput {
        const questionUpdated: Prisma.QuestionUpdateInput = {
            title: question.title,
            content: question.content,
            slug: question.slug.toString(),

            bestAnswer: question.bestAnswerId
                ? {
                    connect: { id: question.bestAnswerId.toString() }
                }
                : {
                    disconnect: true
                },
        }
        return questionUpdated
    }
}