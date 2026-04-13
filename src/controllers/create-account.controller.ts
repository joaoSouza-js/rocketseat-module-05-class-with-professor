import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { HasherService } from 'src/services/hasher/hasher.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

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
        readonly prismaService: PrismaService,
        readonly hasherService: HasherService,
    ) { }

    @Post()
    @HttpCode(201)
    async handler(@Body() body: CreateUserDto) {
        const hashedPassword = await this.hasherService.hash(body.password);
        await this.prismaService.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                name: body.name,
            },
        });
    }
}
