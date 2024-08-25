// commands/GetUsersCommand.js

import Command from './Command';
import prisma from '../prismaClient';

class GetChatUsersCommand extends Command {
  async execute() {
    return await prisma.user.findMany();
  }
}

export default GetChatUsersCommand;
