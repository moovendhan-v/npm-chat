import prisma from '@/prisma/prismaClient';

class GetUsersCommand {
  async execute() {
    return await prisma.user.findMany();
  }
}

export default GetUsersCommand;
