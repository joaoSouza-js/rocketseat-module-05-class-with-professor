import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Student } from "@/domain/forum/enterprise/entities/student";
import { EmailValueObject } from "@/domain/forum/enterprise/value-object/email-value-object";
import { UserModel } from "@/generated/prisma/models";

export class PrismaStudentMapper {
    static toDomain(studentModel: UserModel): Student {
        const email = EmailValueObject.fromString(studentModel.email)
        const id = UniqueEntityId.fromString(studentModel.id)

        const student: Student = Student.rehydrate({
            email: email,
            name: studentModel.name,
            password: studentModel.password,
        }, id)

        return student

    }

    static toPersistence(student: Student): UserModel {
        const userModel: UserModel = {
            email: student.email.value,
            name: student.name,
            password: student.password,
            id: student.id.toString(),
            role: "STUDENT"
        }

        return userModel
    }
}