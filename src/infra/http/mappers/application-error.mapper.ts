import { ApplicationError } from "@/core/error/application-error";
import { ConflictResource } from "@/core/error/conflict-resource";
import { CredentialsError } from "@/core/error/credentials-error";
import { UnauthorizedActionError } from "@/core/error/unauthorized-action-error";
import { BadRequestException, ConflictException, ForbiddenException, UnauthorizedException } from "@nestjs/common";



type ErrorMapping<T extends ApplicationError = ApplicationError> = {
    match: new (...args: any[]) => T;
    handler: (error: T) => Error;
};

const errorMappings: ErrorMapping[] = [
    {
        match: CredentialsError,
        handler: (err) => new UnauthorizedException(err.message),
    },
    {
        match: UnauthorizedActionError,
        handler: (err) => new ForbiddenException(err.message),
    },
    {
        match: ConflictResource,
        handler: (err) => new ConflictException(err.message),
    },
];

export function mapApplicationError(exception: ApplicationError): Error {
    for (const { match, handler } of errorMappings) {
        if (exception instanceof match) {
            return handler(exception);
        }
    }

    return new BadRequestException(exception.message);
}
