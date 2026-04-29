import { StudentProps } from "@/domain/forum/enterprise/entities/student";
import { faker } from "@faker-js/faker";

type makeStudentProps = Partial<StudentProps>

export function makeStudent(props?: makeStudentProps) {
    const email = props?.email ?? faker.internet.email()
    const name = props?.name ?? faker.person.firstName()
    const password = props?.password ?? faker.internet.password()



}