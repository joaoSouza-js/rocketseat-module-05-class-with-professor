import { ApplicationError } from "./application-error";

export class CredentialsError extends ApplicationError {
    public readonly statusCode = 401

    constructor(resourceName: string, resourceId?: string) {
        super(`${resourceName} ${resourceId} not found`)
        this.name = "CredentialsError"
    }
}