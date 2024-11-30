import prisma from '@/prisma/prismaClient';

class GetUsersService {
  public async execute(): Promise<ReturnType<typeof prisma.user.findMany>> {
    return await prisma.user.findMany();
  }
}

export default GetUsersService;
