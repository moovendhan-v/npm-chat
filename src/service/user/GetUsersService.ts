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
    const { pagination } = options;

    const allUsers = await prisma.user.findMany({
      ...pagination,
      include: {
        chatsSent: true,
        chatsReceived: true
      }
    });

    const usersWithChats = allUsers.map(user => ({
      ...user,
      oneOnOneChats: [...user.chatsSent, ...user.chatsReceived]
    }));

    return usersWithChats;
  }

}

export default GetUsersService;
