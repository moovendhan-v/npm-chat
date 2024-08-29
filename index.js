// index.js

import GetChatUsersCommand from './commands/GetUsersCommand.js';

import InsertUserCommand from './commands/CreateUserCommand.js';

async function createUser() {
  // Insert a new user
  const insertUserCommand = new InsertUserCommand('newUser', 'newuser@example.com');
  const newUser = await insertUserCommand.execute();
  console.log('Inserted User:', newUser);
}

createUser();
 

async function run() {
  const getUsersCommand = new GetChatUsersCommand();
  const users = await getUsersCommand.execute();
  console.log('Users:', users);
}

run();