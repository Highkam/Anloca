import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hash passwords
  const hashedPasswordAdmin = await bcrypt.hash('admin123', 10);
  const hashedPasswordUser = await bcrypt.hash('mypassword123', 10);

  // Ensure roles exist in the correct order: admin then user
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: { name: 'admin' },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: { name: 'user' },
  });

  console.log(`✅ Roles ensured: admin(id=${adminRole.id_role}), user(id=${userRole.id_role})`);

  // Ensure an admin user exists (idempotent)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {
      name: 'Admin User',
      password: hashedPasswordAdmin,
      role_id: adminRole.id_role,
    },
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPasswordAdmin,
      register_date: new Date(),
      role_id: adminRole.id_role,
    },
  });

  console.log('✅ Admin user ensured:', adminUser.email);

  // Ensure a regular test user exists (idempotent)
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {
      name: 'Test User',
      password: hashedPasswordUser,
      role_id: userRole.id_role,
    },
    create: {
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPasswordUser,
      register_date: new Date(),
      role_id: userRole.id_role,
    },
  });

  console.log('✅ Test user ensured:', testUser.email);
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
