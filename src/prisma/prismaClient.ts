import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

// Adding middleware to handle Prisma operations
prisma.$use(async (params: Prisma.MiddlewareParams, next) => {
  const start = Date.now(); // Start time for performance logging
  try {
    const result = await next(params);
   
    // Log the query details after execution
    const duration = Date.now() - start;
    console.log(`Query ${params.model}.${params.action} took ${duration}ms`);
   
    return result;
  } catch (error: unknown) {
    console.error(`Error in Prisma operation: ${params.model}.${params.action}`);
    console.error('Error details:', error);
    throw error; // Rethrow the error after logging
  }
});

export default prisma;