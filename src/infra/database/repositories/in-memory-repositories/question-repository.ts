import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionAttachmentRepository } from "@/domain/forum/application/repositories/question-attachment-repository.";
import type { FindLatestQuestions, QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import type { Question } from "@/domain/forum/enterprise/entities/question";
import type { SlugValueObject } from "@/domain/forum/enterprise/value-object/slug-value-object";


interface Repositories {
    questionAttachmentsRepository: QuestionAttachmentRepository;
}

interface QuestionRepositoryInMemoryDeps {
    repositories: Repositories
}

export class QuestionRepositoryInMemory implements QuestionRepository {
    questionAttachmentsRepository: QuestionAttachmentRepository | undefined

    constructor(deps?: QuestionRepositoryInMemoryDeps) {
        this.questionAttachmentsRepository = deps?.repositories.questionAttachmentsRepository
    }


    findLatest(props: PaginationParams): Promise<FindLatestQuestions> {
        const { limit = 10, page = 1 } = props;

        const questionSortedByLastDate = this.questions.sort((a, b) => {
            return b.createdAt.getTime() - a.createdAt.getTime();
        });

        const questions = questionSortedByLastDate.slice(
            (page - 1) * limit,
            page * limit,
        );
        const response: FindLatestQuestions = {
            count: this.questions.length,
            questions: questions
        }
        return Promise.resolve(response);
    }

    update(question: Question): Promise<void> {
        this.questions = this.questions.map((currentQuestion) => {
            if (currentQuestion.id.equals(question.id)) {
                return question;
            }
            return question;
        });

        return Promise.resolve();
    }
    findById(questionId: UniqueEntityId): Promise<Question | null> {
        const question = this.questions.find((question) =>
            question.id.equals(questionId),
        );
        return Promise.resolve(question || null);
    }
    delete(questionId: UniqueEntityId): Promise<null> {
        this.questions = this.questions.filter(
            (question) => !question.id.equals(questionId),
        );

        if (this.questionAttachmentsRepository) {

            this.questionAttachmentsRepository.deleteManyByQuestionId(questionId)
        }

        return Promise.resolve(null);
    }

    private questions: Question[] = [];

    save(question: Question): Promise<Question> {
        this.questions.push(question);
        return Promise.resolve(question);
    }

    findBySlug(slug: SlugValueObject): Promise<Question | null> {
        const question = this.questions.find((question) =>
            question.slug.equals(slug),
        );
        return Promise.resolve(question || null);
    }
}
