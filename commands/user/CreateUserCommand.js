import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class InsertUserCommand {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  async execute() {
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

export default InsertUserCommand;
