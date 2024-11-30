import { PrismaClient, Prisma } from '@prisma/client';
import {
  CreateGroupType
} from "@/types/CreateGroupType.js"

const prisma: PrismaClient = new PrismaClient();

class CreateGroupService {
  private name: string;
  private adminIds: string[];
  private memberIds: string[];

  constructor({ name, adminIds, memberIds }: CreateGroupType) {
    this.name = name;
    this.adminIds = adminIds;
    this.memberIds = memberIds;
  }

  private async ensureUsersExist(userIds: string[]): Promise<void> {
    const existingUsers = await prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
    });

    const existingUserIds = existingUsers.map((user) => user.id);
    const newUsers = userIds.filter((id) => !existingUserIds.includes(id));

    if (newUsers.length > 0) {
      const error = new Error(
        `Invalid user ids: ${newUsers.join(', ')}. These user IDs are not available in the database.`
      );
      error.name = 'InvalidUserId';
      throw error;
    }
  }

  public async execute(): Promise<Prisma.GroupGetPayload<{ include: { admins: true; members: true } }>> {
    console.log('Data:', this.name, this.adminIds, this.memberIds);

    await this.ensureUsersExist([...this.adminIds, ...this.memberIds]);

    const group = await prisma.group.create({
      data: {
        name: this.name,
        admins: {
          create: this.adminIds.map((adminId) => ({
            userId: adminId,
          })),
        },
        members: {
          create: this.memberIds.map((memberId) => ({
            userId: memberId,
          })),
        },
      },
      include: {
        admins: true,
        members: true,
      },
    });

    return group;
  }
}

export default CreateGroupService;
