import { randomUUID } from "node:crypto"

export class UniqueEntityId {
    private readonly value: string

    private constructor(value: string) {
        this.value = value
    }

    static create(): UniqueEntityId {
        return new UniqueEntityId(randomUUID())
    }

    static fromString(value: string): UniqueEntityId {
        return new UniqueEntityId(value)
    }


    equals(other: UniqueEntityId): boolean {
        return this.value === other.value
    }

    toString(): string {
        return this.value
    }
}