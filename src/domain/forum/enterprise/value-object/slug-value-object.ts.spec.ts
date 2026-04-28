import { Slug } from "@/core/slug-generator";
import { describe, expect, it, vi } from "vitest";
import { SlugValueObject } from "./slug-value-object";

describe("SlugValueObject", () => {
    it("should create a normalized slug using Slug.generate", () => {
        const spy = vi.spyOn(Slug, "generate").mockReturnValue("test-slug-123");

        const slug = SlugValueObject.create("Test Slug");

        expect(spy).toHaveBeenCalledWith("Test Slug");
        expect(slug.value).toBe("test-slug-123");
    });

    it("should create from string without modification", () => {
        const slug = SlugValueObject.fromString("raw-slug");

        expect(slug.value).toBe("raw-slug");
    });

    it("should compare two equal slugs", () => {
        const slug1 = SlugValueObject.fromString("same-slug");
        const slug2 = SlugValueObject.fromString("same-slug");

        expect(slug1.equals(slug2)).toBe(true);
    });

    it("should detect different slugs", () => {
        const slug1 = SlugValueObject.fromString("slug-1");
        const slug2 = SlugValueObject.fromString("slug-2");

        expect(slug1.equals(slug2)).toBe(false);
    });

    it("should expose value via getter", () => {
        const slug = SlugValueObject.fromString("my-slug");

        expect(slug.value).toBe("my-slug");
    });
});