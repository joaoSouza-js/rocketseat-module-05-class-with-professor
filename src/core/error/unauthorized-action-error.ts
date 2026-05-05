import { ApplicationError } from "./application-error";

export class UnauthorizedActionError extends ApplicationError {
    constructor(resourceName: string, resourceId?: string) {
        super(`${resourceName} ${resourceId} not unauthorized to perform this action`)
        this.name = "UnauthorizedActionError"
    }
}