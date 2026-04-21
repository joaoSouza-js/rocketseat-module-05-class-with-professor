export class EmailValueObject {
    private constructor(private email: string) {}

    static fromString(raw: string): EmailValueObject {
        const rawWithoutSpaces = raw.trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawWithoutSpaces))
            throw new Error("Invalid email");
        return new EmailValueObject(rawWithoutSpaces);
    }

    get value(){return this.email }
}
