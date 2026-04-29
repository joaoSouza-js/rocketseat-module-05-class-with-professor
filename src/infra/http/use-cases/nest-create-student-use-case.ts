import { CreateStudentUseCase } from "@/domain/forum/application/use-cases/student/create-student-use-case";
import { PrismaStudentRepository } from "@/infra/database/repositories/prisma/prisma-student-repository";
import { HasherService } from "@/services/hasher/hasher.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestCreateStudentUseCase extends CreateStudentUseCase {
    constructor(prismaStudentRepository: PrismaStudentRepository, hasherService: HasherService) {
        super({
            repositories: {
                studentsRepository: prismaStudentRepository
            },
            services: {
                hasher: hasherService
            }
        })
    }
}