import { Student, StudentProps } from "@/domain/forum/enterprise/entities/student";
import { PrismaStudentMapper } from "@/infra/database/mappers/prisma-student-mapper";
import { PrismaService } from "@/infra/services/prisma/prisma.service";
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";

type makeStudentProps = Partial<StudentProps>

export function makeStudent(props?: makeStudentProps) {
    const email = props?.email?.value ?? faker.internet.email()
    const name = props?.name ?? faker.person.firstName()
    const password = props?.password ?? faker.internet.password()


    const student = Student.create({
        email,
        name,
        hashPassword: password
    })

    return student

}

@Injectable()
export class StudentFactory {
    constructor(private prismaService: PrismaService) { }
    async makePrisma(props?: makeStudentProps) {
        const student = makeStudent(props);
        const studentPersistence = PrismaStudentMapper.toPersistence(student);
        await this.prismaService.user.create({
            data: studentPersistence
        })

        return student
    }
}