import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

// Detectar si estamos ejecutando el CLI de Prisma (npx prisma ...)
const isPrismaCli = process.argv.some(arg => /prisma/.test(String(arg)));

// Cargar PrismaClient solo si NO estamos en el CLI de prisma (evita require en tiempo de generación)
let PrismaClientImpl: any = undefined;
if (!isPrismaCli) {
  // require dinámico para evitar side-effects durante `npx prisma generate`
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  PrismaClientImpl = require('@prisma/client').PrismaClient;
}

const BasePrismaClient: any = isPrismaCli ? class {} : PrismaClientImpl;

@Injectable()
export class PrismaService extends BasePrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // Si es CLI de prisma, no pasar opciones a super; si es PrismaClient real, pasar logs
    super(isPrismaCli ? undefined : { log: ['query', 'info', 'warn', 'error'] });
  }

  async onModuleInit() {
    if (isPrismaCli) return;
    try {
      // @ts-ignore
      await this.$connect();
    } catch (err) {
      // evitar romper `prisma generate`
      // console.error('PrismaService onModuleInit connect error:', err);
    }
  }

  async onModuleDestroy() {
    if (isPrismaCli) return;
    try {
      // @ts-ignore
      await this.$disconnect();
    } catch (err) {
      // ignore
    }
  }

  async enableShutdownHooks() {
    if (isPrismaCli) return;
    process.on('beforeExit', async () => {
      // @ts-ignore
      await this.$disconnect();
    });
  }
}