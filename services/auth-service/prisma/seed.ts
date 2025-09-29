import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 🔹 Hasheamos la contraseña para guardarla segura
  const hashedPassword = await bcrypt.hash('mypassword123', 10);

  // 🔹 Creamos o recuperamos un rol "user"
  const role = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: { name: 'user' },
  });

  // 🔹 Creamos el usuario de prueba con ese rol
  await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      register_date: new Date(),
      role_id: role.id_role, // ⚡ Usamos la FK real de tu schema
    },
  });

  console.log('✅ User created: test@example.com / mypassword123');
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
