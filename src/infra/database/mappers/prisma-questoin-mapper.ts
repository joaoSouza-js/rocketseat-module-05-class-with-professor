import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Question } from "@/domain/forum/enterprise/entities/question"
import { QuestionAttachmentList } from "@/domain/forum/enterprise/entities/question-attachment-list"
import { SlugValueObject } from "@/domain/forum/enterprise/value-object/slug-value-object"
import { QuestionModel } from "@/generated/prisma/models"

export class PrismaQuestionMapper {
    static toDomain(questionModel: QuestionModel): Question {
        const questionIdUnique = UniqueEntityId.fromString(questionModel.id)
        const authorId = UniqueEntityId.fromString(questionModel.authorId)
        const slug = SlugValueObject.fromString(questionModel.slug)

        const question = Question.rehydrate(
            {
                title: questionModel.title,
                authorId,
                content: questionModel.content,
                createdAt: questionModel.createdAt,
                slug,
                attachments: new QuestionAttachmentList(),
            },
            questionIdUnique
        )

        return question
    }
}