import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminUsername = process.env.ADMIN_USERNAME ?? 'admin';
  const adminName = process.env.ADMIN_NAME ?? '系统管理员';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'Admin@123456';
  const adminRole = process.env.ADMIN_ROLE ?? 'ADMIN';

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { username: adminUsername },
    update: {
      name: adminName,
      role: adminRole,
      status: 'ACTIVE',
      passwordHash,
    },
    create: {
      username: adminUsername,
      name: adminName,
      role: adminRole,
      status: 'ACTIVE',
      passwordHash,
    },
    select: {
      id: true,
      username: true,
      name: true,
      role: true,
      status: true,
    },
  });

  console.log('Seeded admin user:', admin);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
