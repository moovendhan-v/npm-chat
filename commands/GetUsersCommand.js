// commands/GetUsersCommand.js

import Command from './Command.js';
import prisma from '../prisma/prismaClient.js';

class GetChatUsersCommand extends Command {
  async execute() {
    return await prisma.user.findMany();
  }
}

export default GetChatUsersCommand;
 