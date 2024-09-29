// commands/GetChatUserMessageCommand.js

import Command from './Command';
import prisma from '../../prisma/prismaClient.js';

class GetChatUserMessageCommand extends Command {
  constructor(userId) {
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
