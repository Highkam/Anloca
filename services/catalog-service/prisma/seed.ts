// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting catalog database seed...');

  // Clean existing data
  await prisma.product.deleteMany();

  // Create sample products
  await prisma.product.createMany({
    data: [
      {
        name: 'Laptop Gaming',
        description: 'Laptop para gaming de alta gama',
        price: 1299.99,
        stock: 10,
        category: 'electronics',
      },
      {
        name: 'Smartphone Android',
        description: 'Teléfono inteligente con Android',
        price: 499.99,
        stock: 25,
        category: 'electronics',
      },
      {
        name: 'Auriculares Inalámbricos',
        description: 'Auriculares Bluetooth con cancelación de ruido',
        price: 199.99,
        stock: 15,
        category: 'electronics',
      },
      {
        name: 'Libro de Programación',
        description: 'Libro sobre desarrollo web moderno',
        price: 39.99,
        stock: 50,
        category: 'books',
      },
      {
        name: 'Mesa de Oficina',
        description: 'Mesa ergonómica para home office',
        price: 299.99,
        stock: 5,
        category: 'furniture',
      },
    ],
  });

  console.log('Catalog seed completed!');
  console.log('Sample products created');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });