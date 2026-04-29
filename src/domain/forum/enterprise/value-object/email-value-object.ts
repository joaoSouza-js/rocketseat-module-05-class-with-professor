export class EmailValueObject {
    private constructor(private email: string) { }

    static fromString(raw: string): EmailValueObject {
        const rawWithoutSpaces = raw.trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawWithoutSpaces))
            throw new Error("Invalid email");
        return new EmailValueObject(rawWithoutSpaces);
    }

    compare(comparableEmail: EmailValueObject) {
        const isSameEmail = this.value === comparableEmail.email
        return isSameEmail
    }

    get value() { return this.email }
}
