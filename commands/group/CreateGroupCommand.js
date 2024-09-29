import Command from '../Command.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CreateGroupCommand extends Command {
  constructor(name, adminIds, memberIds) {
    super();
    this.name = name;
    this.adminIds = adminIds;
    this.memberIds = memberIds;
  }

  async ensureUsersExist(userIds) {
    const existingUsers = await prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
    });

    const existingUserIds = existingUsers.map(user => user.id);
    const newUsers = userIds.filter(id => !existingUserIds.includes(id));

    if (newUsers.length > 0) {
      const error = new Error(`Invalid user ids: ${newUsers}, this user id is not avaialable in database`);
      error.name = 'InvalidUserId';
      throw error;
      // await prisma.user.createMany({
      //   data: newUsers.map(id => ({
      //     id,
      //     username: `user_${id}`,  // Example: creating a basic user with a default username
      //     email: `${id}@example.com`,  // Placeholder email
      //   })),
      // });
    }
  }

  async execute() {
    console.log("data", this.name, this.adminIds, this.memberIds);

    // Ensure all admins and members exist
    await this.ensureUsersExist([...this.adminIds, ...this.memberIds]);

    // Create the group
    const group = await prisma.group.create({
      data: {
        name: this.name,  // Use the provided group name
        admins: {
          create: this.adminIds.map(adminId => ({
            userId: adminId,
          })),
        },
        members: {
          create: this.memberIds.map(memberId => ({
            userId: memberId,
          })),
        },
      },
    });

    // Return the created group
    return group;
  }
}

export default CreateGroupCommand;
