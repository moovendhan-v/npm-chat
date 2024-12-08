import { PrismaClient, Prisma } from '@prisma/client';
import { UserFilters, RequestOptions, } from "@/types/GetUsesType";
import { CreateUserInput } from "@/types/CreateUser";


const prisma = new PrismaClient();

class CreateUserService {

  public async createUser(payload: CreateUserInput): Promise<Prisma.UserGetPayload<{}>> {
    try {
      const user = await prisma.user.create({
        data: {
          username: payload.userName,
          email: payload.email,
        },
      });
      return user;
    } catch (error) {
      console.error('Error inserting user:', error);
      throw error;
    }
  }
  
}

export default CreateUserService;
