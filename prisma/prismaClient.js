import { PrismaClient } from '@prisma/client';

// Instantiate Prisma Client
const prisma = new PrismaClient();

// Optional: Middleware or error handling can be added here
prisma.$use(async (params, next) => {
  try {
    const result = await next(params);
    return result;
  } catch (error) {
    console.error(`Error in Prisma operation: ${params.action}`);
    throw error;
  }
});

export default prisma;
