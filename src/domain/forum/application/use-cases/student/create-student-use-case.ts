import { ConflictResource } from "@/core/error/conflict-resouce";
import { Student } from "@/domain/forum/enterprise/entities/student";
import { EmailValueObject } from "@/domain/forum/enterprise/value-object/email-value-object";
import { Hasher } from "../../cryptography/hasher";
import { StudentRepository } from "../../repositories/student-repository";

interface CreateStudentUseCaseRequest {
    name: string,
    email: string,
    password: string
}

interface Repositories {
    studentsRepository: StudentRepository,

}

interface Services {
    hasher: Hasher
}

interface CreateStudentUseCaseDeps {
    repositories: Repositories,
    services: Services
}

export class CreateStudentUseCase {
    studentsRepository: StudentRepository
    hasher: Hasher


    constructor(readonly deps: CreateStudentUseCaseDeps) {
        this.studentsRepository = deps.repositories.studentsRepository
        this.hasher = deps.services.hasher
    }

    async execute(input: CreateStudentUseCaseRequest) {
        const hashPassword = await this.hasher.hash(input.password)

        const studentEmail = EmailValueObject.fromString(input.email)
        const foundStudent = await this.studentsRepository.findByEmail(studentEmail)

        if (foundStudent) {
            throw new ConflictResource("email")
        }

        const student = Student.create({
            email: input.email,
            hashPassword: hashPassword,
            name: input.name
        })

        await this.studentsRepository.create(student)
    }
}