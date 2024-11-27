import prisma from '@/prisma/prismaClient'

class GetChannelCommand {
  async GetAllGroups() {
    return await prisma.channel.findMany();
  }
}

export default GetChannelCommand;
