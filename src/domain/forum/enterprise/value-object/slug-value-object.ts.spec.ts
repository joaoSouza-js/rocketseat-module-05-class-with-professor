import { describe, expect, it } from "vitest";
import { SlugValueObject } from "./slug-value-object";


describe("SlugValueObject", () => {
    it("should normalize a simple string to lowercase and replace spaces with hyphens", () => {
        const slug = SlugValueObject.create("Hello World");
        expect(slug.value).toBe("hello-world");
    });

    it("should remove accents and special characters", () => {
        const slug = SlugValueObject.create("Olá João! Programação avançada");
        expect(slug.value).toBe("ola-joao-programacao-avancada");
    });

    it("should replace multiple spaces and special characters with a single hyphen", () => {
        const slug = SlugValueObject.create("DDD   + Clean   Architecture!!!");
        expect(slug.value).toBe("ddd-clean-architecture");
    });

    it("should remove leading and trailing hyphens", () => {
        const slug = SlugValueObject.create("   ---Hello World---   ");
        expect(slug.value).toBe("hello-world");
    });

    it("should convert underscores to hyphens", () => {
        const slug = SlugValueObject.create("this_is_a_test");
        expect(slug.value).toBe("this-is-a-test");
    });

    it("should handle empty strings", () => {
        const slug = SlugValueObject.create("");
        expect(slug.value).toBe("");
    });

    it("should handle strings with only invalid characters", () => {
        const slug = SlugValueObject.create("!!!@#$$%^&*()");
        expect(slug.value).toBe("");
    });

    it("should normalize mixed-case, accents, spaces, and symbols together", () => {
        const input = "  Olá João! Let's test-slug_value.  ";
        const slug = SlugValueObject.create(input);
        expect(slug.value).toBe("ola-joao-let-s-test-slug-value");
    });
});