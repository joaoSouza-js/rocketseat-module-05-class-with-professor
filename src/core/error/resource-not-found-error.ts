import { ApplicationError } from "./application-error";

export class ResourceNotFoundError extends ApplicationError {
    public readonly statusCode = 400

    constructor(resourceName?: string, resourceId?: string) {
        super(`${resourceName} ${resourceId} not found`)
        this.name = "ResourceNotFoundError"
    }
}