// import { jest } from '@jest/globals';

// // Mock Services
// jest.mock('@/Services/user/CreateUserService');
// jest.mock('@/Services/user/GetUsersService');
// jest.mock('@/Services/group/CreateGroupService');
// jest.mock('@/Services/channel/InsertChannleService');
// jest.mock('@/Services/group/GetGroupsService');
// jest.mock('@/Services/channel/GetChannelService');

// import GetChannelService from '@/service/channel/GetChannelService';
// import GetGroupsService from '@/service/group/GetGroupsService';
// import InsertUserService from '@/service/user/CreateUserService';
// import GetUsersService from '@/service/user/GetUsersService';
// import CreateGroupService from '@/service/group/CreateGroupService';
// import InsertChannelService from '@/service/channel/InsertChannleService';

// // Test cases

// describe('Index file functionality', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('should call GetAllGroups on GetChannelService', async () => {
//     const mockResponse = [{ id: 1, name: 'Channel 1' }];
//     GetChannelService.prototype.GetAllGroups = jest.fn().mockResolvedValue(mockResponse);

//     const Service = new GetChannelService();
//     const response = await Service.GetAllGroups();

//     expect(GetChannelService.prototype.GetAllGroups).toHaveBeenCalledTimes(1);
//     expect(response).toEqual(mockResponse);
//   });

//   test('should handle error in GetChannelService', async () => {
//     const mockError = new Error('Failed to fetch channels');
//     GetChannelService.prototype.GetAllGroups = jest.fn().mockRejectedValue(mockError);

//     const Service = new GetChannelService();

//     try {
//       await Service.GetAllGroups();
//     } catch (error) {
//       expect(error).toBe(mockError);
//     }

//     expect(GetChannelService.prototype.GetAllGroups).toHaveBeenCalledTimes(1);
//   });

//   test('should create a new user using InsertUserService', async () => {
//     const mockUser = { id: 1, username: 'Test User', email: 'test@example.com' };
//     InsertUserService.prototype.execute = jest.fn().mockResolvedValue(mockUser);

//     const Service = new InsertUserService(mockUser);
//     const response = await Service.execute();

//     expect(InsertUserService.prototype.execute).toHaveBeenCalledTimes(1);
//     expect(response).toEqual(mockUser);
//   });

//   test('should fetch all users using GetUsersService', async () => {
//     const mockUsers = [
//       { id: 1, username: 'User 1' },
//       { id: 2, username: 'User 2' },
//     ];
//     GetUsersService.prototype.execute = jest.fn().mockResolvedValue(mockUsers);

//     const Service = new GetUsersService();
//     const response = await Service.execute();

//     expect(GetUsersService.prototype.execute).toHaveBeenCalledTimes(1);
//     expect(response).toEqual(mockUsers);
//   });

//   test('should create a group using CreateGroupService', async () => {
//     const mockGroup = { id: 1, name: 'Test Group', adminIds: ['admin1'], memberIds: ['member1'] };
//     CreateGroupService.prototype.execute = jest.fn().mockResolvedValue(mockGroup);

//     const Service = new CreateGroupService(mockGroup);
//     const response = await Service.execute();

//     expect(CreateGroupService.prototype.execute).toHaveBeenCalledTimes(1);
//     expect(response).toEqual(mockGroup);
//   });

//   test('should create a channel using InsertChannelService', async () => {
//     const mockChannel = { id: 1, name: 'Test Channel', description: 'Test Description' };
//     InsertChannelService.prototype.createChannel = jest.fn().mockResolvedValue(mockChannel);

//     const input = {
//       name: 'Channel name',
//       description: 'Channel description',
//       userId: 'user1',
//       isAdmin: true,
//     };
//     const Service = new InsertChannelService();
//     const response = await Service.createChannel(input);

//     expect(InsertChannelService.prototype.createChannel).toHaveBeenCalledWith(input);
//     expect(response).toEqual(mockChannel);
//   });

//   test('should fetch groups using GetGroupsService', async () => {
//     const mockGroups = [{ id: 1, name: 'Group 1' }];
//     GetGroupsService.prototype.GetAllGroups = jest.fn().mockResolvedValue(mockGroups);

//     const Service = new GetGroupsService();
//     const response = await Service.GetAllGroups();

//     expect(GetGroupsService.prototype.GetAllGroups).toHaveBeenCalledTimes(1);
//     expect(response).toEqual(mockGroups);
//   });
// });
