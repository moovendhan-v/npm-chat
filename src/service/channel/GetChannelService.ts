import prisma from '@/prisma/prismaClient';
import { UserFilters, RequestOptions, } from "@/types/GetUsesType";

class GetChannelService {

  async getChannelDetails(filters: UserFilters = {}) {
    const { id } = filters;
    const where: any = {};
    if (id) where.id = id;

    return await prisma.group.findMany({ where });
  }

  async getAllChannelDetails(options: RequestOptions) {
    const { pagination, select } = options;

    const allChannels = await prisma.group.findMany({
      ...pagination,
      select
    })

    return allChannels;
  }

}

export default GetChannelService;
