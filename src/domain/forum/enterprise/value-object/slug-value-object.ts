export class SlugValueObject {
    private constructor(private slug: string) { }


    /**
     * Receives a string and normalize it as a slug
     * Example: 
     * 
     * @param plainText {string}
     * 
     */
    static create(plainText: string) {
        const slug = plainText
            .normalize("NFKD")
            .toLowerCase()
            .trim()
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .replace(/_/g, "-")
            .replace(/-$/g, "");

        return new SlugValueObject(slug);
    }

    static fromString(slug: string) {
        return new SlugValueObject(slug);
    }

    equals(slug: SlugValueObject) {
        return this.slug === slug.slug;
    }

    get value() {
        return this.slug;
    }
}