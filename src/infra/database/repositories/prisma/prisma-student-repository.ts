import { StudentRepository } from "@/domain/forum/application/repositories/student-repository";
import { Student } from "@/domain/forum/enterprise/entities/student";
import { EmailValueObject } from "@/domain/forum/enterprise/value-object/email-value-object";
import { PrismaService } from "@/services/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaStudentMapper } from "../../mappers/prisma-student-mapper";

@Injectable()
export class PrismaStudentRepository implements StudentRepository {

    constructor(readonly prismaService: PrismaService) { }

    async findByEmail(email: EmailValueObject): Promise<Student | null> {
        const studentFounded = await this.prismaService.user.findUnique({ where: { email: email.value } })

        if (studentFounded === null) return null

        const studentMapped = PrismaStudentMapper.toDomain(studentFounded)

        return studentMapped
    }
    async create(student: Student): Promise<void> {
        const studentMapped = PrismaStudentMapper.toPersistence(student)
        this.prismaService.user.create({ data: studentMapped })
    }

}