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

  await prisma.faculty.create({
    data: {
      name: 'Faculté des Sciences',
      fields: {
        create: [
          {
            name: 'Génie Informatique',
          },
          {
            name: 'Intelligence Artificielle',
          },
        ],
      },
    },
  });

  await prisma.student.create({
    data: {
      email: 'musanziwilfried@gmail.com',
      name: 'Wilfried Musanzi',
      personal_number: 'S20190001',
      promotion: 1,
      field: {
        connect: {
          id: 1,
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
