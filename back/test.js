import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  const students = await prisma.student.findMany();
  console.log(students);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
