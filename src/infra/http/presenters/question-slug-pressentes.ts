import { Question } from "@/domain/forum/enterprise/entities/question"

export interface QuestionSlugPresenterResponse {
    slug: string
}

export class QuestionSlugPresenter {
    static toHTTP(question: Question): QuestionSlugPresenterResponse {
        return {
            slug: question.slug.value
        }
    }
}