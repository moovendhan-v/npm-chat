import prisma from '@/prisma/prismaClient'

class GetChannelService {
  async GetAllGroups() {
    return await prisma.channel.findMany();
  }
}

export default GetChannelService;
