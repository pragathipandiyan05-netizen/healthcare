import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding the database...');

  // Create Roles
  const superAdminRole = await prisma.role.upsert({
    where: { name: 'SUPER_ADMIN' },
    update: {},
    create: {
      name: 'SUPER_ADMIN',
      description: 'Full access to the entire platform',
    },
  });

  const stateAdminRole = await prisma.role.upsert({
    where: { name: 'STATE_ADMIN' },
    update: {},
    create: {
      name: 'STATE_ADMIN',
      description: 'Access to all state resources',
    },
  });

  // Create Districts
  const districtChennai = await prisma.district.upsert({
    where: { name: 'Chennai' },
    update: {},
    create: {
      name: 'Chennai',
      status: 'ACTIVE',
    },
  });

  // Create Hospitals
  const hospital1 = await prisma.hospital.upsert({
    where: { hospital_code: 'GH-CHEN-01' },
    update: {},
    create: {
      name: 'Government General Hospital',
      hospital_code: 'GH-CHEN-01',
      type: 'Government',
      address: 'Rajiv Gandhi Salai, Chennai',
      district_id: districtChennai.id,
      latitude: 13.0827,
      longitude: 80.2707,
      status: 'ONLINE',
    },
  });

  // Create Departments
  const emergencyDept = await prisma.department.upsert({
    where: { name_hospital_id: { name: 'Emergency', hospital_id: hospital1.id } },
    update: {},
    create: {
      name: 'Emergency',
      hospital_id: hospital1.id,
    },
  });

  // Create Users (Healthcare Workers)
  // Password hash is 'password123' hashed with a dummy bcrypt/argon2 hash for seeding purposes
  const dummyHash = '$argon2id$v=19$m=65536,t=3,p=4$c29tZXNhbHQ$somehashvalue';

  const worker1 = await prisma.user.upsert({
    where: { email: 'priya.kumar@hospital.org' },
    update: {},
    create: {
      employee_id: 'HWC-00124',
      name: 'Priya Kumar',
      email: 'priya.kumar@hospital.org',
      phone: '+919876543210',
      password_hash: dummyHash,
      role_id: stateAdminRole.id,
      hospital_id: hospital1.id,
      district_id: districtChennai.id,
      department_id: emergencyDept.id,
      status: 'ACTIVE',
    },
  });

  // Create SOS Alert
  await prisma.sosAlert.create({
    data: {
      worker_id: worker1.id,
      hospital_id: hospital1.id,
      district_id: districtChennai.id,
      department_id: emergencyDept.id,
      latitude: 13.0828,
      longitude: 80.2708,
      status: 'ACTIVE',
      priority: 'CRITICAL',
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
