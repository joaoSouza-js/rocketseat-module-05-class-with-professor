import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { NestCreateStudentUseCase } from '../use-cases/nest-create-student-use-case';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;
}

@Controller('/accounts')
export class CreateAccountController {
    constructor(
        readonly nestCreateStudentUseCase: NestCreateStudentUseCase
    ) { }

    @Post()
    @HttpCode(201)
    async handler(@Body() body: CreateUserDto) {
        const { email, password, name } = body;
        await this.nestCreateStudentUseCase.execute({ email, password, name });

    }
}
