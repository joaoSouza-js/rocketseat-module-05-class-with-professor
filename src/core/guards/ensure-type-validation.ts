import { InvalidTypeError } from "../error/invalid-type"

export function ensureTypeValidation(type: string, allowedTypes: string[]): string {
    const isValidationType = allowedTypes.some(validationType => validationType === type)
    if (isValidationType === false) {

        throw new InvalidTypeError(type, allowedTypes)
    }
    return type
}