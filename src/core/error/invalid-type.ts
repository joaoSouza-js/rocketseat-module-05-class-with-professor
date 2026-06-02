import { ApplicationError } from "./application-error";

export class InvalidTypeError extends ApplicationError {
    constructor(type: string, allowedTypes: string[]) {
        super(`${type} is not a valid type. Valid types are: ${allowedTypes.join(', ')}`);
    }
}