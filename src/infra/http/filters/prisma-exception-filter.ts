import {
    BadRequestException,
    Catch,
    ConflictException,
    ExceptionFilter,
    InternalServerErrorException
} from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: PrismaClientKnownRequestError) {
        switch (exception.code) {
            case 'P2002': {
                const fields = (exception.meta?.target as string[]) || []

                throw new ConflictException(
                    `record already exists on fields: ${fields.join(', ')}`,
                )
            }

            case 'P2003':
                throw new BadRequestException('Invalid relation')

            default:
                throw new InternalServerErrorException('Database error')
        }
    }
}