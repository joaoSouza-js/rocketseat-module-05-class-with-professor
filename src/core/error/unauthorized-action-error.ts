import { ApplicationError } from "./application-error";

export class UnauthorizedActionError extends ApplicationError {
    public readonly statusCode = 403

    constructor(resourceName: string, resourceId?: string) {
        super(`${resourceName} ${resourceId} not unauthorized to perform this action`)
        this.name = "UnauthorizedActionError"
    }
}