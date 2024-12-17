import prisma from '@/prisma/prismaClient';
import { UserFilters, } from "@/types/GetUsesType";
import { RequestOptions } from '@/types/express';

class GetUsersService {

  async getUserDetails(filters: UserFilters = {}) {
    const { id, name } = filters;
    const where: any = {};
    if (id) where.id = id;
    if (name) where.username = { contains: name, mode: 'insensitive' };

    return await prisma.user.findMany({ where });
  }

  async getAllUsers(options: RequestOptions) {
    const { pagination, select } = options;

    const allUsers = await prisma.user.findMany({
      ...pagination,
      select
    });

    return allUsers;
  }

}

export default GetUsersService;
