import prisma from '../../prisma/prismaClient.js';

class GetUsersCommand {
  async execute() {
    return await prisma.user.findMany();
  }
}

export default GetUsersCommand;
