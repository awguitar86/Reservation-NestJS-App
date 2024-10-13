import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const customer1 = await prisma.customer.create({
    data: {
      name: 'Michael Scott',
      email: 'michael.s@dundermifflin.com',
      phone: '570-555-1234',
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: 'Jim Halpert',
      email: 'jim.h@dundermifflin.com',
      phone: '570-555-5678',
    },
  });

  const vehicle1 = await prisma.vehicle.create({
    data: {
      make: 'Chrysler',
      model: 'Sebring',
      year: 2004,
      vin: '1FTFW1R6XBFB08616',
      customerId: customer1.id,
    },
  });

  const vehicle2 = await prisma.vehicle.create({
    data: {
      make: 'Toyota',
      model: 'Corolla',
      year: 2000,
      vin: '1BDST1T6ZHKL05178',
      customerId: customer2.id,
    },
  });

  await prisma.reservation.create({
    data: {
      customerId: customer1.id,
      vehicleId: vehicle1.id,
      timeSlot: new Date('2024-10-14T11:15:00Z'),
    },
  });

  await prisma.reservation.create({
    data: {
      customerId: customer2.id,
      vehicleId: vehicle2.id,
      timeSlot: new Date('2024-10-16T09:30:00Z'),
    },
  });
}

main()
  .catch((e) => {
    console.log(Error(e));
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
