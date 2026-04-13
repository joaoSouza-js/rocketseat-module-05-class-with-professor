import { customAlphabet } from 'nanoid'

export class NanoIdeGenerator {
    private static readonly ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789'
    private static readonly nano = customAlphabet(this.ALPHABET, 10)

    static generate(): string {
        return this.nano()
    }
}