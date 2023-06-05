import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
  const salt: string = await bcrypt.genSalt(10);
  const password: string = await bcrypt.hash('admin', salt);

  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      name: 'admin',
      password,
      is_active: true,
      role: {
        create: {
          name: 'admin',
        },
      },
    },
  });
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
