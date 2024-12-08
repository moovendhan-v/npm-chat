import { PrismaClient, Prisma } from '@prisma/client';
import { CreateUserInput } from '@/types/CreateUser';

const prisma = new PrismaClient();

class InsertUserService {
  private username: string;
  private email: string;

  constructor({ username, email }: CreateUserInput) {
    this.username = username;
    this.email = email;
  }

  public async execute(): Promise<Prisma.UserGetPayload<{}>> {
    try {
      const user = await prisma.user.create({
        data: {
          username: this.username,
          email: this.email,
        },
      });
      return user;
    } catch (error) {
      console.error('Error inserting user:', error);
      throw error;
    }
  }
}

export default InsertUserService;