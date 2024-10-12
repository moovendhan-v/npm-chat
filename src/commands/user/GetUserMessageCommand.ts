// commands/GetChatUserMessageCommand.js

import Command from '../Command.js';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


class GetChatUserMessageCommand extends Command {
  private userId: string;
  constructor(userId: string) {
    super();
    this.userId = userId;
  }

  async execute() {
    return await prisma.message.findMany({
      where: { senderId: this.userId },
    });
  }
}

export default GetChatUserMessageCommand;
