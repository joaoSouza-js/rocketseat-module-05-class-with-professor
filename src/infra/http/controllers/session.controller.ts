import { Body, Controller, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { HasherService } from 'src/services/hasher/hasher.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

export class SessionDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    password!: string;


}

@Controller('/sessions')
export class SessionController {
    constructor(
        readonly prismaService: PrismaService,
        readonly hasherService: HasherService,
        readonly jwtService: JwtService
    ) { }

    @Post()
    @HttpCode(201)
    async handler(@Body() body: SessionDto) {

        const findUser = await this.prismaService.user.findUniqueOrThrow({
            where: {
                email: body.email
            }
        })

        const isPasswordValid = await this.hasherService.compare(body.password, findUser.password)


        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials')


        const token = this.jwtService.sign({
            sub: findUser.id
        })
        return {
            access_token: token
        }
    }
}
