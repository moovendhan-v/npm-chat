import prisma from '@/prisma/prismaClient';
import { UserFilters, RequestOptions, } from "@/types/GetUsesType";

class GetChannelService {

  async getChannelDetails(filters: UserFilters = {}) {
    const { id } = filters;
    const where: any = {};
    if (id) where.id = id;

    return await prisma.channel.findMany({ where });
  }

  async getAllChannelDetails(options: RequestOptions) {
    const { pagination, select } = options;
  
    const allChannels = await prisma.channel.findMany({
      ...pagination,
      select: {
        ...select,
        _count: {
          select: { participants: true },
        },
      },
    });
   // TODO: Handle this to who can handle
    const allChannlesWithParticipant = allChannels.map(channel => ({
      ...channel,
      participantCount: channel._count.participants,
    }));

    console.log("allChannlesWithParticipant", allChannlesWithParticipant);
    return allChannlesWithParticipant;
  }  

}

export default GetChannelService;
