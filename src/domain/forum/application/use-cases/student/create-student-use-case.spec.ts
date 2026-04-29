import { ConflictResource } from "@/core/error/conflict-resouce"
import { EmailValueObject } from "@/domain/forum/enterprise/value-object/email-value-object"
import { StudentRepositoryInMemory } from "@/infra/database/repositories/in-memory-repositories/student-repository"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { Hasher } from "../../cryptography/hasher"
import { StudentRepository } from "../../repositories/student-repository"
import { CreateStudentUseCase } from "./create-student-use-case"



describe("create student use case", () => {
    let hasher: Hasher
    let studentRepository: StudentRepository
    let sut: CreateStudentUseCase

    beforeEach(() => {
        hasher = {
            compare: vi.fn().mockReturnValue(true),
            hash: vi.fn().mockReturnValue("hashed-password")
        }
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