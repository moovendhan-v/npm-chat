import { PrismaClient } from '@prisma/client';
import {
  Channel,
  ChannelParticipant,
  InsertChannelCommandInput,
  ChatService,
} from '@/types/ChannelTypes';

const prisma: PrismaClient = new PrismaClient();

class InsertChannelCommand implements ChatService {

  async createChannel(input: InsertChannelCommandInput): Promise<Channel> {
    try {
      const channel = await prisma.channel.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });

      await prisma.channelParticipant.create({
        data: {
          userId: input.userId,
          channelId: channel.id,
          isAdmin: input.isAdmin,
        },
      });

      return channel;
    } catch (error) {
      console.error('Error creating channel:', error);
      throw error;
    }
  }

  async addParticipant(
    userId: string,
    channelId: string,
    isAdmin: boolean
  ): Promise<ChannelParticipant> {
    try {
      const participant = await prisma.channelParticipant.create({
        data: {
          userId,
          channelId,
          isAdmin,
        },
      });
      return participant;
    } catch (error) {
      console.error('Error adding participant:', error);
      throw error;
    }
  }
  
}

export default InsertChannelCommand;
