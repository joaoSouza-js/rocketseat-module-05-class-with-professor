import { Question } from "@/domain/forum/enterprise/entities/question"

export interface QuestionPresenterResponse {
    id: string
    title: string
    slug: string
    authorId: string,
    bestAnswerId?: string | null,
    cratedAt: Date,
    updatedAt?: Date | null
}



export class QuestionPresenter {
    static toHTTP(question: Question): QuestionPresenterResponse {
        const presenter: QuestionPresenterResponse = {
            id: question.id.toString(),
            authorId: question.authorId.toString(),
            title: question.title,
            slug: question.slug.value,
            cratedAt: question.createdAt,
            updatedAt: question.updatedAt ?? null,
            bestAnswerId: question.bestAnswerId?.toString() ?? null
        }

        return presenter
    }
}