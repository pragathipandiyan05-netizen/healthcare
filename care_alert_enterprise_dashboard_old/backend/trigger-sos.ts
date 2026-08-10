import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function triggerSos() {
  console.log('Fetching random worker from database...');
  
  const worker = await prisma.user.findFirst({
    include: {
      hospital: true,
      district: true,
      department: true
    }
  });

  if (!worker) {
    console.error('No workers found! Please run `npx prisma db seed` first.');
    process.exit(1);
  }

  console.log(`Triggering SOS for worker: ${worker.name} at ${worker.hospital?.name}...`);

  const response = await fetch('http://127.0.0.1:3000/api/v1/sos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      worker_id: worker.id,
      hospital_id: worker.hospital_id,
      district_id: worker.district_id,
      department_id: worker.department_id,
      latitude: 13.0828,
      longitude: 80.2708,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log('✅ SOS Alert Triggered successfully!', data.id);
  } else {
    console.error('❌ Failed to trigger SOS', await response.text());
  }
}

triggerSos()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
