import { StudentRepository } from "@/domain/forum/application/repositories/student-repository";
import { Student } from "@/domain/forum/enterprise/entities/student";
import { EmailValueObject } from "@/domain/forum/enterprise/value-object/email-value-object";

export class StudentRepositoryInMemory implements StudentRepository {
    private students: Student[] = []

    findByEmail(email: EmailValueObject): Promise<Student | null> {
        const studentFounded = this.students.find(student => student.email.compare(email)) ?? null

        return Promise.resolve(studentFounded)
    }
    create(student: Student): Promise<void> {
        this.students.push(student)

        return Promise.resolve()
    }

}