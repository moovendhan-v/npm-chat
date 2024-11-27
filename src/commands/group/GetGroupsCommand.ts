import prisma from '@/prisma/prismaClient'

class GetGroupsCommand {
  async GetAllGroups() {
    return await prisma.group.findMany();
  }
}

export default GetGroupsCommand;
