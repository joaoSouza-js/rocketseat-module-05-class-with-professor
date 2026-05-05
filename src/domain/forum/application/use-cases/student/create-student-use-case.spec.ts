import { ConflictResource } from "@/core/error/conflict-resource"
import { EmailValueObject } from "@/domain/forum/enterprise/value-object/email-value-object"
import { FakeHasher } from "test/cryptography/fake-hasher"
import { StudentRepositoryInMemory } from "test/in-memory-repositories/student-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { HasherGenerator } from "../../cryptography/hasher-generator"
import { StudentRepository } from "../../repositories/student-repository"
import { CreateStudentUseCase } from "./create-student-use-case"



describe("create student use case", () => {
    let hasher: HasherGenerator
    let studentRepository: StudentRepository
    let sut: CreateStudentUseCase

    beforeEach(() => {
        hasher = new FakeHasher()
        studentRepository = new StudentRepositoryInMemory()
        sut = new CreateStudentUseCase({
            repositories: {
                studentsRepository: studentRepository
            },
            services: {
                hasher: hasher
            }
        })
    })

    it("should create a new user", async () => {
        const studentEmail = EmailValueObject.fromString("joedo@gmail.com")

        const input = {
            name: "joe doe",
            email: studentEmail.value,
            password: "password"
        }

        await sut.execute(input)

        const student = await studentRepository.findByEmail(studentEmail)

        expect(student).toBeTruthy()
    })

    it("should throw a ConflictResource if email already exist", async () => {
        const studentEmail = EmailValueObject.fromString("joedo@gmail.com")

        const input = {
            name: "joe doe",
            email: studentEmail.value,
            password: "password"
        }

        await sut.execute(input)

        await expect(async () => {
            await sut.execute(input)
        })
            .rejects.toBeInstanceOf(ConflictResource)
    })
})