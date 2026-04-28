import { Slug } from "@/core/slug-generator";

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
        const slug = Slug.generate(plainText);
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