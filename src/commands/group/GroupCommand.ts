import { PrismaClient } from '@prisma/client';
import Command from '../Command'; // Adjust the import as needed

const prisma = new PrismaClient();

class GroupCommand extends Command {
  private groupId: string | null;
  private name: string | null;
  private adminIds: string[];
  private memberIds: string[];

  constructor(groupId: string | null = null, name: string | null = null, adminIds: string[] = [], memberIds: string[] = []) {
    super();
    this.groupId = groupId; 
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

    const existingUserIds = existingUsers.map(user => user.id);
    const missingUsers = userIds.filter(id => !existingUserIds.includes(id));

    if (missingUsers.length > 0) {
      const error = new Error(`Invalid user ids: ${missingUsers}, these users are not available in the database`);
      error.name = 'InvalidUserId';
      throw error;
    }
  }

  private async ensureGroupExists(): Promise<void> {
    if (!this.groupId) {
      const error = new Error("Group ID is not provided");
      error.name = 'NoGroupIdProvided';
      throw error;
    }
  
    const group = await prisma.group.findUnique({
      where: { id: this.groupId },
    });
  
    if (!group) {
      const error = new Error(`Group with ID ${this.groupId} does not exist`);
      error.name = 'NoGroupFound';
      throw error;
    }
  }

  async createGroup(): Promise<any> {
    console.log("Creating group with data", this.name, this.adminIds, this.memberIds);
  
    if (!this.name) {
      throw new Error("Group name cannot be null or empty");
    }
  
    await this.ensureUsersExist([...this.adminIds, ...this.memberIds]);
  
    const group = await prisma.group.create({
      data: {
        name: this.name,
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
  
    return group;
  }
  
  async addMembers(): Promise<any> {
    if (this.groupId === null) {
      throw new Error("Group ID cannot be null");
    }
    await this.ensureGroupExists();
    await this.ensureUsersExist(this.memberIds);

    const updatedGroup = await prisma.group.update({
      where: { id: this.groupId },
      data: {
        members: {
          create: this.memberIds.map(memberId => ({
            userId: memberId,
          })),
        },
      },
    });

    return updatedGroup;
  }

  async addAdmins(): Promise<any> {

    if (this.groupId === null) {
      throw new Error("Group ID cannot be null");
    }

    await this.ensureGroupExists();
    await this.ensureUsersExist(this.adminIds);

    const updatedGroup = await prisma.group.update({
      where: { id: this.groupId },
      data: {
        admins: {
          create: this.adminIds.map(adminId => ({
            userId: adminId,
          })),
        },
      },
    });

    return updatedGroup;
  }

  async deleteGroup(): Promise<void> {

    if (this.groupId === null) {
      throw new Error("Group ID cannot be null");
    }

    await this.ensureGroupExists();

    await prisma.groupAdmin.deleteMany({
      where: { groupId: this.groupId },
    });

    await prisma.groupMember.deleteMany({
      where: { groupId: this.groupId },
    });

    await prisma.group.delete({
      where: { id: this.groupId },
    });

    console.log(`Group with ID ${this.groupId} and all its related records have been deleted successfully.`);
  }
}

export default GroupCommand;
