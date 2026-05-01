import { CredentialsError } from "@/core/error/credentials-error"
import { ensureExists } from "@/core/guards/ensure-exist"
import { EmailValueObject } from "@/domain/forum/enterprise/value-object/email-value-object"
import { Encrypter } from "../../cryptography/encrypter"
import { HasherComparer } from "../../cryptography/hasher-comparer"
import { StudentRepository } from "../../repositories/student-repository"

interface AuthenticateStudentUseCaseCaseRequest {
    email: string
    password: string
}

export interface AuthenticateStudentUseCaseCaseResponse {
    accessToken: string
}

interface Repositories {
    studentRepository: StudentRepository,
}

interface Services {
    hasher: HasherComparer,
    encrypter: Encrypter
}

interface AuthenticateStudentUseCaseCaseDeps {
    repositories: Repositories
    services: Services
}

export class AuthenticateStudentUseCaseCase {
    studentsRepository: StudentRepository
    hasher: HasherComparer
    encrypter: Encrypter

    constructor(AuthenticateStudentUseCaseCaseDeps: AuthenticateStudentUseCaseCaseDeps) {
        this.studentsRepository = AuthenticateStudentUseCaseCaseDeps.repositories.studentRepository
        this.hasher = AuthenticateStudentUseCaseCaseDeps.services.hasher
        this.encrypter = AuthenticateStudentUseCaseCaseDeps.services.encrypter
    }


    async execute(input: AuthenticateStudentUseCaseCaseRequest): Promise<AuthenticateStudentUseCaseCaseResponse> {
        const inputEmail = EmailValueObject.fromString(input.email)
        const studentOrNull = await this.studentsRepository.findByEmail(inputEmail)

        const student = ensureExists(studentOrNull, "User", input.email);

        const isPasswordCorrect = await this.hasher.compare(input.password, student.password)


        if (isPasswordCorrect === false) {
            throw new CredentialsError("Email", input.email)
        }

        const accessToken = await this.encrypter.encrypt({
            sub: student.id.toString()
        })

        return {
            accessToken
        }
    }
}