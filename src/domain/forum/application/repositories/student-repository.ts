import { Student } from "../../enterprise/entities/student"
import { EmailValueObject } from "../../enterprise/value-object/email-value-object"

export interface StudentRepository {
    findByEmail(email: EmailValueObject): Promise<Student | null>
    create(student: Student): Promise<void>
}