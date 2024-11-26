import prisma from '../prisma/prismaClient';

class GetUsersCommand {
  public async execute(): Promise<ReturnType<typeof prisma.user.findMany>> {
    return await prisma.user.findMany();
  }
}

export default GetUsersCommand;
