import { ApplicationError } from "./application-error";

export class ConflictResource extends ApplicationError {

    constructor(resourceName: string) {
        super(`${resourceName} already exist`)
        this.name = "CredentialsError"
    }
}