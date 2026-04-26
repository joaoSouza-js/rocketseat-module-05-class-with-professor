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


    async findLatest(props: PaginationParams): Promise<Question[]> {
        const { limit = 10, page = 1 } = props;

        const questions = await this.prismaService.question.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: limit,
            skip: (page - 1) * limit,
        });

        const questionsMapped = questions.map(PrismaQuestionMapper.toDomain)
        return questionsMapped


    }

    async update(question: Question): Promise<void> {
        const questionMapped = PrismaQuestionMapper.toUpdatePersistence(question)
        await this.prismaService.question.update({
            where: {
                id: question.id.toString()
            },
            data: questionMapped,
        })
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
    async delete(questionId: UniqueEntityId): Promise<null> {
        await this.prismaService.question.delete({
            where: {
                id: questionId.toString()
            }
        })
        return null
    }


    async save(question: Question): Promise<Question> {
        const questionToPersist = PrismaQuestionMapper.toPersistence(question)
        await this.prismaService.question.create({
            data: questionToPersist
        })

        return question
    }

    async findBySlug(slug: SlugValueObject): Promise<Question | null> {
        const questionFoundedBySlug = await this.prismaService.question.findUnique({
            where: {
                slug: slug.value
            }
        })

        if (questionFoundedBySlug === null) return null
        const question = PrismaQuestionMapper.toDomain(questionFoundedBySlug)

        return question
    }
}
