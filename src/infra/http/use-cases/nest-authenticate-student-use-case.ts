import { AuthenticateStudentUseCaseCase } from "@/domain/forum/application/use-cases/student/authenticate-student-use-case";
import { PrismaStudentRepository } from "@/infra/database/repositories/prisma/prisma-student-repository";
import { EncrypterService } from "@/services/encrypter/encrypter.service";
import { HasherService } from "@/services/hasher/hasher.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestAuthenticateStudentUseCase extends AuthenticateStudentUseCaseCase {
    constructor(studentsRepository: PrismaStudentRepository, hasher: HasherService, encrypter: EncrypterService) {
        super({
            repositories: {
                studentRepository: studentsRepository
            },
            services: {
                hasher: hasher,
                encrypter: encrypter
            }
        })
    }
}