// index.js

import GetUsersCommand from './commands/GetUsersCommand';

async function run() {
  const getUsersCommand = new GetUsersCommand();
  const users = await getUsersCommand.execute();
  console.log('Users:', users);

//   const createGroupCommand = new CreateGroupCommand(
//     'Developers',
//     ['adminUserId1', 'adminUserId2'],
//     ['userId1', 'userId2', 'userId3']
//   );
//   const group = await createGroupCommand.execute();
//   console.log('Created Group:', group);
}

run();
