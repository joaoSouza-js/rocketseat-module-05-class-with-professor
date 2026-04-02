import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserModel } from 'generated/prisma/models';

@Injectable()
export class AppService {
  constructor(readonly prismaService: PrismaService) { }

  async getHello(): Promise<UserModel[]> {
    const users = await this.prismaService.user.findMany()
    return users
  }
}
