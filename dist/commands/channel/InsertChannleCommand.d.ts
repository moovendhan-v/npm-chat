declare class InsertChannelCommand {
    constructor(name: any, description: any, userId: any, isAdmin: any);
    execute(): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
    }>;
}
export default InsertChannelCommand;
