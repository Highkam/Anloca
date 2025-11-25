import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('mypassword123', 10);

  const role = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: { name: 'user' },
  });

  await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      register_date: new Date(),
      role_id: role.id_role,
    },
  });

  console.log('User created: test@example.com / mypassword123');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
