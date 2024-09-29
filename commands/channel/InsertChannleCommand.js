import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class InsertChannelCommand {
  constructor(name, description, userId, isAdmin) {
    this.name = name;
    this.description = description;
    this.userId = userId;
    this.isAdmin = isAdmin;
  }

  async execute() {
    try {
      const channel = await prisma.channel.create({
        data: {
          name: this.name,
          description: this.description,
        },
      });

      await prisma.channelParticipant.create({
        data: {
          userId: this.userId,
          channelId: channel.id,
          isAdmin: true,
        },
      });

      return channel;
    } catch (error) {
      console.error('Error inserting channel:', error);
      throw error;
    }
  }
}

export default InsertChannelCommand;
