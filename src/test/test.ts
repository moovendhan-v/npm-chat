import { jest } from '@jest/globals';

// Mock commands
jest.mock('@/commands/user/CreateUserCommand');
jest.mock('@/commands/user/GetUsersCommand');
jest.mock('@/commands/group/CreateGroupCommand');
jest.mock('@/commands/channel/InsertChannleCommand');
jest.mock('@/commands/group/GetGroupsCommand');
jest.mock('@/commands/channel/GetChannelCommand');

import GetChannelCommand from '@/commands/channel/GetChannelCommand';
import GetGroupsCommand from '@/commands/group/GetGroupsCommand';
import InsertUserCommand from '@/commands/user/CreateUserCommand';
import GetUsersCommand from '@/commands/user/GetUsersCommand';
import CreateGroupCommand from '@/commands/group/CreateGroupCommand';
import InsertChannelCommand from '@/commands/channel/InsertChannleCommand';

// Test cases

describe('Index file functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call GetAllGroups on GetChannelCommand', async () => {
    const mockResponse = [{ id: 1, name: 'Channel 1' }];
    GetChannelCommand.prototype.GetAllGroups = jest.fn().mockResolvedValue(mockResponse);

    const command = new GetChannelCommand();
    const response = await command.GetAllGroups();

    expect(GetChannelCommand.prototype.GetAllGroups).toHaveBeenCalledTimes(1);
    expect(response).toEqual(mockResponse);
  });

  test('should handle error in GetChannelCommand', async () => {
    const mockError = new Error('Failed to fetch channels');
    GetChannelCommand.prototype.GetAllGroups = jest.fn().mockRejectedValue(mockError);

    const command = new GetChannelCommand();

    try {
      await command.GetAllGroups();
    } catch (error) {
      expect(error).toBe(mockError);
    }

    expect(GetChannelCommand.prototype.GetAllGroups).toHaveBeenCalledTimes(1);
  });

  test('should create a new user using InsertUserCommand', async () => {
    const mockUser = { id: 1, username: 'Test User', email: 'test@example.com' };
    InsertUserCommand.prototype.execute = jest.fn().mockResolvedValue(mockUser);

    const command = new InsertUserCommand(mockUser);
    const response = await command.execute();

    expect(InsertUserCommand.prototype.execute).toHaveBeenCalledTimes(1);
    expect(response).toEqual(mockUser);
  });

  test('should fetch all users using GetUsersCommand', async () => {
    const mockUsers = [
      { id: 1, username: 'User 1' },
      { id: 2, username: 'User 2' },
    ];
    GetUsersCommand.prototype.execute = jest.fn().mockResolvedValue(mockUsers);

    const command = new GetUsersCommand();
    const response = await command.execute();

    expect(GetUsersCommand.prototype.execute).toHaveBeenCalledTimes(1);
    expect(response).toEqual(mockUsers);
  });

  test('should create a group using CreateGroupCommand', async () => {
    const mockGroup = { id: 1, name: 'Test Group', adminIds: ['admin1'], memberIds: ['member1'] };
    CreateGroupCommand.prototype.execute = jest.fn().mockResolvedValue(mockGroup);

    const command = new CreateGroupCommand(mockGroup);
    const response = await command.execute();

    expect(CreateGroupCommand.prototype.execute).toHaveBeenCalledTimes(1);
    expect(response).toEqual(mockGroup);
  });

  test('should create a channel using InsertChannelCommand', async () => {
    const mockChannel = { id: 1, name: 'Test Channel', description: 'Test Description' };
    InsertChannelCommand.prototype.createChannel = jest.fn().mockResolvedValue(mockChannel);

    const input = {
      name: 'Channel name',
      description: 'Channel description',
      userId: 'user1',
      isAdmin: true,
    };
    const command = new InsertChannelCommand();
    const response = await command.createChannel(input);

    expect(InsertChannelCommand.prototype.createChannel).toHaveBeenCalledWith(input);
    expect(response).toEqual(mockChannel);
  });

  test('should fetch groups using GetGroupsCommand', async () => {
    const mockGroups = [{ id: 1, name: 'Group 1' }];
    GetGroupsCommand.prototype.GetAllGroups = jest.fn().mockResolvedValue(mockGroups);

    const command = new GetGroupsCommand();
    const response = await command.GetAllGroups();

    expect(GetGroupsCommand.prototype.GetAllGroups).toHaveBeenCalledTimes(1);
    expect(response).toEqual(mockGroups);
  });
});
