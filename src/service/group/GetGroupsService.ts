import prisma from '@/prisma/prismaClient';
import { UserFilters, RequestOptions, } from "@/types/GetUsesType";

class GetUsersService {

  async getGroupsDetails(filters: UserFilters = {}) {
    const { id } = filters;
    const where: any = {};
    if (id) where.id = id;

    return await prisma.group.findMany({ where });
  }

  async getAllGroupDetails(options: RequestOptions) {
    const { pagination, select } = options;

    const allGroups = await prisma.group.findMany({
      ...pagination,
      select
    })

    return allGroups;
  }

}

export default GetUsersService;
