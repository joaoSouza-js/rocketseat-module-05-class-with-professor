import { ApplicationError } from "./application-error";

export class ConflictResource extends ApplicationError {
    public readonly statusCode = 409

    constructor(resourceName: string) {
        super(`${resourceName} already exist`)
        this.name = "CredentialsError"
    }
}