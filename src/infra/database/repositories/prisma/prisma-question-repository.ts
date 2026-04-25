import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionAttachmentRepository } from "@/domain/forum/application/repositories/question-attachment-repository.";
import type { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { SlugValueObject } from "@/domain/forum/enterprise/value-object/slug-value-object";
import { PrismaService } from "@/services/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaQuestionMapper } from "../../mappers/prisma-questoin-mapper";


interface Repositories {
    questionAttachmentsRepository: QuestionAttachmentRepository;
}
interface Services {
    prismaService: PrismaService
}

interface PrismaQuestionRepositoryDeps {
    repositories: Repositories,
    services: Services
}

@Injectable()
export class PrismaQuestionRepository implements QuestionRepository {
    questionAttachmentsRepository: QuestionAttachmentRepository | undefined
    prismaService: PrismaService

    constructor(deps: PrismaQuestionRepositoryDeps) {
        this.questionAttachmentsRepository = deps.repositories.questionAttachmentsRepository
        this.prismaService = deps.services.prismaService
    }


    findLatest(props: PaginationParams): Promise<Question[]> {
        const { limit = 10, page = 1 } = props;

        const questionSortedByLastDate = this.questions.sort((a, b) => {
            return b.createdAt.getTime() - a.createdAt.getTime();
        });

        const questions = questionSortedByLastDate.slice(
            (page - 1) * limit,
            page * limit,
        );
        return Promise.resolve(questions);
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
    async findById(questionId: UniqueEntityId): Promise<Question | null> {
        const questionFounded = await this.prismaService.question.findUnique({
            where: {
                id: questionId.toString()
            },

        })

        if (!questionFounded) {
            return Promise.resolve(null)
        }

        const question = PrismaQuestionMapper.toDomain(questionFounded)
        return question


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
