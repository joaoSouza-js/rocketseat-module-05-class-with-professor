import { faker } from "@faker-js/faker"
import TestAgent from "supertest/lib/agent"

type CreateSessionTestRequestProps = Partial<{
    name: string,
    email: string,
    password: string
}>

type sessionResponseBody = {
    access_token: string
}

export async function createSessionTestRequest(agent: TestAgent, props?: CreateSessionTestRequestProps): Promise<sessionResponseBody> {
    const name = props?.name ?? faker.person.firstName()
    const email = props?.email ?? faker.internet.email()
    const password = props?.password ?? faker.internet.password()

    const user = {
        name,
        email,
        password
    }

    await agent.post('/accounts').send(user)
    const sessionResponse = await agent.post("/sessions").send({
        email: user.email,
        password: user.password
    })
    const body: sessionResponseBody = sessionResponse.body
    return body

}