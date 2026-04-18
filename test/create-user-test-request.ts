import { faker } from "@faker-js/faker"
import TestAgent from "supertest/lib/agent"

type CreateUserTestRequestProps = Partial<{
    name: string,
    email: string,
    password: string
}>

export async function createUserTestRequest(agent: TestAgent, props?: CreateUserTestRequestProps) {
    const name = props?.name ?? faker.person.firstName()
    const email = props?.email ?? faker.internet.email()
    const password = props?.password ?? faker.internet.password()

    const user = {
        name,
        email,
        password
    }

    await agent.post('/accounts').send(user)

    return user

}