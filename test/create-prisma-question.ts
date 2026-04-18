import { PrismaService } from "@/services/prisma/prisma.service"
import { Slug } from "@/utils/slug-generator"
import { faker } from "@faker-js/faker"

type prismaQuestion = Partial<{
    title: string,
    content: string
    slug: string
}>

export async function createPrismaQuestion(prismaService: PrismaService, question?: prismaQuestion) {
    const title = question?.title ?? faker.word.words(4)
    const content = question?.content ?? faker.lorem.lines(5)
    const slug = question?.slug ?? Slug.generate(title)

    const questionData = prismaService.question.create({
        data: {
            content,
            title,
            slug
        }
    })

    return questionData

}