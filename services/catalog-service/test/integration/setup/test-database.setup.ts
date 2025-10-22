import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../src/infraestructure/database/prisma/prisma.service';

export class TestDatabaseSetup {
  private prisma: PrismaService;

  async setup() {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    this.prisma = module.get<PrismaService>(PrismaService);
    await this.cleanDatabase();
    return this.prisma;
  }

  async cleanDatabase() {
    const tables = await this.prisma.$queryRaw`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `;

    for (const table of tables as any[]) {
      if (table.tablename !== '_prisma_migrations') {
        await this.prisma.$executeRawUnsafe(
          `TRUNCATE TABLE "${table.tablename}" RESTART IDENTITY CASCADE`
        );
      }
    }
  }

  async teardown() {
    await this.prisma.$disconnect();
  }
}