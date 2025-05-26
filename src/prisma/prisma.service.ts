import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        const prismaClient = this.$connect();
        return prismaClient;
    }

    async onModuleDestroy() {
        const prismaClient = this.$disconnect();
        return prismaClient;
    }
}
