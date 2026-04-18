import { HasherService } from "@/services/hasher/hasher.service"
import { PrismaService } from "@/services/prisma/prisma.service"
import { faker } from "@faker-js/faker"

type User = Partial<{
    name: string,
    email: string,
    password: string
}>


interface CreatePrismaUser {
    prismaService: PrismaService,
    hashService: HasherService,
    user?: User
}

export async function createPrismaUser(props: CreatePrismaUser) {
    const { hashService, prismaService, user } = props

    const userPassword = user?.password ?? faker.internet.password()
    const passwordHash = await hashService.hash(userPassword)
    const userCreated = await prismaService.user.create({
        data: {
            name: user?.name ?? faker.person.firstName(),
            email: user?.email ?? faker.internet.email(),
            password: passwordHash,
        },
    })

    const userResponse = {
        id: userCreated.id,
        name: userCreated.name,
        email: userCreated.email,
        password: userPassword,
        passwordHash: userCreated.password,
    }

    return userResponse
}

