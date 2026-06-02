import { describe, expect, it } from "vitest";
import { InvalidTypeError } from "../error/invalid-type";
import { ensureTypeValidation } from "./ensure-type-validation";

describe("ensure validation type", () => {

    it(("should validate correct type"), () => {
        const typeSelected = "type-01"
        const allowedTypes = [
            typeSelected,
            "type-02",
            "type-03",
        ]

        const type = ensureTypeValidation(typeSelected, allowedTypes)
        expect(type).toEqual(typeSelected)
    })

    it("should throw a InvalidTypeError if type is not valid", () => {
        const typeSelected = "wrong-type"
        const allowedTypes = [
            "type-01",
            "type-02",
            "type-03",
        ]

        expect(() => {
            ensureTypeValidation(typeSelected, allowedTypes)
        }).toThrow(
            InvalidTypeError
        )

    })

})