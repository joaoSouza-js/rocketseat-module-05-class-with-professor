import { AuthenticateStudentUseCaseCaseResponse } from '@/domain/forum/application/use-cases/student/authenticate-student-use-case';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { NestAuthenticateStudentUseCase } from '../use-cases/nest-authenticate-student-use-case';

export class SessionDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    password!: string;


}

@Controller('/sessions')
export class SessionController {
    constructor(readonly useCase: NestAuthenticateStudentUseCase) { }
    @Post()
    @HttpCode(201)
    async handler(@Body() body: SessionDto): Promise<AuthenticateStudentUseCaseCaseResponse> {

        const response = await this.useCase.execute({ email: body.email, password: body.password });
        return response
    }
}
