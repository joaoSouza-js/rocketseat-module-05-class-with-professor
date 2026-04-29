import { Entity } from "@/core/entities/entity";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { EmailValueObject } from "@/domain/forum/enterprise/value-object/email-value-object";


export interface StudentProps {
    name: string;
    email: EmailValueObject;
    password: string;
}

interface CreateStudent {
    name: string;
    email: string;
    hashPassword: string;
}

export class Student extends Entity<StudentProps> {


    static create(input: CreateStudent): Student {
        const email = EmailValueObject.fromString(input.email);
        return new Student({
            name: input.name,
            email: email,
            password: input.hashPassword,
        });
    }

    static rehydrate(input: StudentProps, _id?: UniqueEntityId): Student {
        return new Student(input, _id);
    }


    get name() {
        return this.props.name;
    }
    get email() {
        return this.props.email;
    }
    get password() {
        return this.props.password;
    }


}
