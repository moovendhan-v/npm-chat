import prisma from '@/prisma/prismaClient';

class GetUsersService {
  async execute() {
    return await prisma.user.findMany();
  }
}

export default GetUsersService;
