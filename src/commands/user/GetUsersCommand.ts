// commands/GetUsersCommand.js

import Command from '../Command.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class GetUsersCommand extends Command {
  async execute() {
    return await prisma.user.findMany();
  }
}

export default GetUsersCommand;
 