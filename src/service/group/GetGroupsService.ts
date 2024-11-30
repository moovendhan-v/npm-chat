import prisma from '@/prisma/prismaClient'

class GetGroupsService {
  async GetAllGroups() {
    return await prisma.group.findMany();
  }
}

export default GetGroupsService;
