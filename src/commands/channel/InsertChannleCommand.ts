import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class InsertChannelCommand {
  private name: string;
  private description: string;
  private userId: string;
  private isAdmin: boolean;

  constructor(name: string, description: string, userId: string, isAdmin: boolean) {
    this.name = name;
    this.description = description;
    this.userId = userId;
    this.isAdmin = isAdmin;
  }

  async execute(): Promise<any> { 
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
          isAdmin: this.isAdmin,
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
