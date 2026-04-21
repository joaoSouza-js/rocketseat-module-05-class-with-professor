import { describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/core/error/resource-not-found-error";
import { ensureExists } from "./ensure-exist";

describe("ensure exist guard", () => {
    it("should throw a ResourceNotFoundError is value is null", () => {
        expect(() => { ensureExists(null, "Entity") }).toThrow(ResourceNotFoundError)
    });
    it("should throw a ResourceNotFoundError is value is undefined", () => {
        expect(() => { ensureExists(undefined, "Entity") }).toThrow(ResourceNotFoundError)
    });
    it("should be to return the value is he is Truthy", () => {
        const value = {}
        expect(() => { ensureExists(value, "Entity") }).toBeTruthy()
    })
});
