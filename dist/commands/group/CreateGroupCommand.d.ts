import Command from '../Command.js';
declare class GroupCommand extends Command {
    constructor(groupId?: null, name?: null, adminIds?: never[], memberIds?: never[]);
    ensureUsersExist(userIds: any): Promise<void>;
    ensureGroupExists(): Promise<void>;
    createGroup(): Promise<{
        id: string;
        name: string;
    }>;
    addMembers(): Promise<{
        id: string;
        name: string;
    }>;
    addAdmins(): Promise<{
        id: string;
        name: string;
    }>;
    deleteGroup(): Promise<void>;
}
export default GroupCommand;
