// CreateGroupType.ts 

import { Group, User, GroupMember } from "@prisma/client";

export type CreateGroupType ={
    name: string;
    admins?: GroupAdmin[];
    members?: GroupMember[];
};

export type GroupAdmin = {
    id: string;
    userId: string;
    groupId: string;
    user: User;
    group: Group;
};