import { PrismaClient } from '@prisma/client';
import { startOfDay, subDays } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
  const users = [
    { name: 'Amy', gender: 'Female' },
    { name: 'Ben', gender: 'Male' },
    { name: 'Casey', gender: 'Female' },
    { name: 'Hannah', gender: 'Female' },
    { name: 'Jack', gender: 'Male' },
    { name: 'Josh', gender: 'Male' },
  ];

  for (let i = 0; i < 14; i++) {
    const date = startOfDay(subDays(new Date(), i));
    for (const user of users) {
      await prisma.sleepEntry.create({
        data: {
          name: user.name,
          gender: user.gender,
          sleepTimeDuration: Math.floor(Math.random() * 4) + 6,
          date: date,
        },
      });
    }
  }

  console.log('Seed data created successfully');
}

main().then(async () => {
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});