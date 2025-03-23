import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  logger = new Logger('Prismaservice');
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }
}
