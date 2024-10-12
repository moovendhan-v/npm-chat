import Command from './Command.js';
declare class GetChatUserMessageCommand extends Command {
    constructor(userId: any);
    execute(): Promise<any>;
}
export default GetChatUserMessageCommand;
