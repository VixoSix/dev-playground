import 'dotenv/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        const url = process.env.DATABASE_URL;

        if (!url) {
            throw new Error('DATABASE_URL is not set');
        }

        super({
            adapter: new PrismaBetterSqlite3({ url }),
        });
    }

    async onModuleInit() {
        await this.$connect();
    }
}
