import Command from '../Command.js';
declare class GetUsersCommand extends Command {
    execute(): Promise<any>;
}
export default GetUsersCommand;
