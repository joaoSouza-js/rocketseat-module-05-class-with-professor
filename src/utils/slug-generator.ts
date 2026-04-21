import { NanoIdeGenerator } from "../nano-id-generator";

export class Slug {
    static generate(text: string): string {
        return text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '')
            .concat('-', NanoIdeGenerator.generate());
    }
}