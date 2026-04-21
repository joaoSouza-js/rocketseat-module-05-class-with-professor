import { Entity } from "@/core/entities/entity";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { EmailValueObject } from "@/domain/forum/enterprise/value-object/email-value-object";


interface InstructorProps {
    name: string;
    email: EmailValueObject;
    password: string;
}

interface CreateInstructor {
    name: string;
    email: string;
    hashPassword: string;
}

export class Instructor extends Entity<InstructorProps> {

    static create(input: CreateInstructor): Instructor {
        const email = EmailValueObject.fromString(input.email);

        return new Instructor({
            email: email,
            name: input.name,
            password: input.hashPassword,
        });
    }

    static rehydrate(input: InstructorProps, _id?: UniqueEntityId): Instructor {
        return new Instructor(input, _id);
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
