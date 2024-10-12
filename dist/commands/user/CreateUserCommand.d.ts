declare class InsertUserCommand {
    constructor(username: any, email: any);
    execute(): Promise<{
        id: string;
        username: string;
        email: string;
        createdAt: Date;
    }>;
}
export default InsertUserCommand;
