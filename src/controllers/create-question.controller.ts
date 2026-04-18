import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { IsString, MaxLength } from 'class-validator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CurrentUser } from 'src/modules/auth/auth/current-use-decorator';
import type { UserJwtPayload } from 'src/modules/auth/auth/jwt.strategy';
import { HasherService } from 'src/services/hasher/hasher.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Slug } from 'src/utils/slug-generator';

export class CreteQuestionBody {
    @IsString()
    title!: string

    @IsString()
    @MaxLength(2400)
    content!: string

}

@Controller('/questions')
export class CreateQuestionController {
    constructor(
        readonly prismaService: PrismaService,
        readonly hasherService: HasherService,
    ) { }

    @Post()
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    async handler(
        @Body() body: CreteQuestionBody,
        @CurrentUser() user: UserJwtPayload,
    ) {



        const question = await this.prismaService.question.create({
            data: {
                content: body.content,
                title: body.title,
                slug: Slug.generate(body.title),
                authorId: user.sub
            }
        })

        return {
            slug: question.slug
        }
    }
}
