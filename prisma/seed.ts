import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminUsername = process.env.ADMIN_USERNAME ?? 'admin';
  const adminName = process.env.ADMIN_NAME ?? '系统管理员';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'Admin@123456';
  const adminRole = process.env.ADMIN_ROLE ?? 'ADMIN';
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@example.com';
  const adminPhone = process.env.ADMIN_PHONE ?? '13800000001';
  const adminDepartment = process.env.ADMIN_DEPARTMENT ?? '系统管理';

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  const updateData: any = {
    name: adminName,
    email: adminEmail,
    phone: adminPhone,
    department: adminDepartment,
    role: adminRole,
    status: 'ACTIVE',
    passwordHash,
  };
  const createData: any = {
    username: adminUsername,
    name: adminName,
    email: adminEmail,
    phone: adminPhone,
    department: adminDepartment,
    role: adminRole,
    status: 'ACTIVE',
    passwordHash,
  };

  const admin = await prisma.user.upsert({
    where: { username: adminUsername },
    update: updateData,
    create: createData,
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
