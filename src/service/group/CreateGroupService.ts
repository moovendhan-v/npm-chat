import { PrismaClient, Prisma } from '@prisma/client';
import { CreateGroupType } from "@/types/CreateGroupType";

const prisma = new PrismaClient();

class CreateGroupService {

  private async validateUsers(userIds: string[]): Promise<void> {
    const existingUsers = await prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
    });

    const existingUserIds = existingUsers.map(user => user.id);
    const invalidUserIds = userIds.filter(id => !existingUserIds.includes(id));

    if (invalidUserIds.length > 0) {
      throw new Error(`Invalid user IDs: ${invalidUserIds.join(', ')}`);
    }
  }

  public async createGroup(payload: CreateGroupType) {
    const { name, admins = [], members = [] } = payload;

    if (!name || typeof name !== 'string') {
      throw new Error('Group name is required and must be a string.');
    }

    // Extract admin and member IDs for validation
    const adminIds = admins.map(admin => admin.userId);
    const memberIds = members.map(member => member.userId);

    // Validate user IDs in the database
    await this.validateUsers([...adminIds, ...memberIds]);

    try {
      const group = await prisma.group.create({
        data: {
          name,
          admins: {
            create: adminIds.map(userId => ({ userId })),
          },
          members: {
            create: memberIds.map(userId => ({ userId })),
          },
        },
        include: {
          admins: true,
          members: true,
        },
      });

      return group;
    } catch (error) {
      console.error('Error creating group:', error);
      throw new Error('Failed to create group. Please try again.');
    }
  }
}

export default CreateGroupService;
