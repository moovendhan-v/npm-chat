import { PrismaClient, Prisma, User, OneOnOneChat } from '@prisma/client';
import { CreateUserInput } from "@/types/CreateUser";

interface CreateChatInput {
  senderId: string;
  receiverId: string;
}

interface SendMessageInput {
  chatId: string;
  senderId: string;
  content: string;
}

const prisma = new PrismaClient();

class PrivateChatService {

  public async createOneOnOneChat(payload: CreateChatInput): Promise<OneOnOneChat> {
    try {
      // Check if users exist
      const [sender, receiver] = await Promise.all([
        prisma.user.findUnique({ where: { id: payload.senderId } }),
        prisma.user.findUnique({ where: { id: payload.receiverId } })
      ]);

      if (!sender || !receiver) {
        throw new Error('Sender or receiver not found');
      }

      // Check if chat already exists between these users
      const existingChat = await prisma.oneOnOneChat.findFirst({
        where: {
          OR: [
            {
              AND: [
                { senderId: payload.senderId },
                { receiverId: payload.receiverId }
              ]
            },
            {
              AND: [
                { senderId: payload.receiverId },
                { receiverId: payload.senderId }
              ]
            }
          ]
        }
      });

      if (existingChat) {
        return existingChat;
      }

      // Create new chat
      const chat = await prisma.oneOnOneChat.create({
        data: {
          senderId: payload.senderId,
          receiverId: payload.receiverId,
        },
      });

      return chat;
    } catch (error) {
      console.error('Error creating one-on-one chat:', error);
      throw error;
    }
  }

  public async sendMessage(payload: SendMessageInput) {
    try {
      // Check if chat exists
      const chat = await prisma.oneOnOneChat.findUnique({
        where: { id: payload.chatId },
      });

      if (!chat) {
        throw new Error('Chat not found');
      }

      // Verify sender is part of the chat
      if (chat.senderId !== payload.senderId && chat.receiverId !== payload.senderId) {
        throw new Error('User is not part of this chat');
      }

      // Create message
      const message = await prisma.message.create({
        data: {
          content: payload.content,
          senderId: payload.senderId,
          chatId: payload.chatId,
        },
      });

      return message;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  public async getChatMessages(chatId: string) {
    try {
      const messages = await prisma.message.findMany({
        where: {
          chatId: chatId,
        },
        include: {
          sender: {
            select: {
              id: true,
              username: true,
            },
          },
          reactions: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      return messages;
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      throw error;
    }
  }

  public async getUserChats(userId: string) {
    try {
      const chats = await prisma.oneOnOneChat.findMany({
        where: {
          OR: [
            { senderId: userId },
            { receiverId: userId }
          ]
        },
        include: {
          sender: {
            select: {
              id: true,
              username: true,
            },
          },
          receiver: {
            select: {
              id: true,
              username: true,
            },
          },
          messages: {
            orderBy: {
              createdAt: 'desc'
            },
            take: 1,
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return chats;
    } catch (error) {
      console.error('Error fetching user chats:', error);
      throw error;
    }
  }
}

export default PrivateChatService;