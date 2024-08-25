// commands/CreateGroupCommand.js

import Command from './Command';
import prisma from '../prismaClient';

class CreateGroupCommand extends Command {
  constructor(name, adminIds, memberIds) {
    super();
    this.name = name;
    this.adminIds = adminIds;
    this.memberIds = memberIds;
  }

  async execute() {
    // Create the group
    const group = await prisma.group.create({
      data: {
        name: this.name,
        admins: {
          connect: this.adminIds.map(id => ({ id })),
        },
        members: {
          connect: this.memberIds.map(id => ({ id })),
        },
      },
    });

    // Assign permissions (for simplicity, we assume all members have the same permissions)
    await prisma.permission.createMany({
      data: this.memberIds.map(userId => ({
        groupId: group.id,
        userId,
        canRead: true,
        canWrite: true,
        isAdmin: this.adminIds.includes(userId),
      })),
    });

    return group;
  }
}

export default CreateGroupCommand;
