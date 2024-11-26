import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

prisma.$use(async (params: Prisma.MiddlewareParams, next) => {
  try {
    const result = await next(params);
    return result;
  } catch (error) {
    console.error(`Error in Prisma operation: ${params.action}`);
    throw error;
  }
});

export default prisma;
