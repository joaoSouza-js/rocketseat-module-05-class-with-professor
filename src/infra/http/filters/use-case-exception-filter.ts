import { ApplicationError } from "@/core/error/application-error";
import { Catch, ExceptionFilter } from "@nestjs/common";
import { mapApplicationError } from "../mappers/application-error.mapper";




@Catch(ApplicationError)
export class UseCaseExceptionFilter implements ExceptionFilter {
    catch(exception: ApplicationError) {
        const error = mapApplicationError(exception)
        throw error
    }
}