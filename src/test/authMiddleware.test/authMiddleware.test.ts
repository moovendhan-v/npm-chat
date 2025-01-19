// import { Request, Response, NextFunction } from 'express';
// import { authMiddleware } from '@/middleware/authMiddleware';
// import GetUsersService from '@/service/user/GetUsersService';
// import AppError from '@/utils/AppError';
// import { UserRole } from '@/types/express';

// // Mock GetUsersService
// jest.mock('@/service/user/GetUsersService');

// describe('authMiddleware', () => {
//     let mockRequest: Partial<Request>;
//     let mockResponse: Partial<Response>;
//     let nextFunction: jest.Mock;
//     let mockGetUserDetails: jest.Mock;

//     beforeEach(() => {
//         // Reset environment variables
//         process.env.VALID_API_KEY = 'test-api-key-123';

//         // Setup request mock
//         mockRequest = {
//             headers: {
//                 'x-user-id': 'test-user-id',
//                 'x-api-key': 'test-api-key-123',
//                 'x-role': 'user' as UserRole
//             }
//         };

//         // Setup response mock
//         mockResponse = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn()
//         };

//         // Setup next function mock
//         nextFunction = jest.fn();

//         // Setup mock user service response
//         mockGetUserDetails = jest.fn().mockResolvedValue([{
//             id: 'test-user-id',
//             username: 'testuser',
//             email: 'test@example.com'
//         }]);

//         // Mock the getUserDetails method
//         (GetUsersService as jest.Mock).mockImplementation(() => ({
//             getUserDetails: mockGetUserDetails
//         }));
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     it('should successfully authenticate with valid credentials', async () => {
//         await authMiddleware(
//             mockRequest as Request,
//             mockResponse as Response,
//             nextFunction
//         );

//         expect(mockGetUserDetails).toHaveBeenCalledWith({
//             id: 'test-user-id'
//         });
//         expect(nextFunction).toHaveBeenCalled();
//         expect(mockRequest.user).toEqual({
//             id: 'test-user-id',
//             name: 'testuser',
//             email: 'test@example.com',
//             role: 'user'
//         });
//     });

//     it('should use "guest" role when no role is provided', async () => {
//         mockRequest.headers = {
//             'x-user-id': 'test-user-id',
//             'x-api-key': 'test-api-key-123'
//         };

//         await authMiddleware(
//             mockRequest as Request,
//             mockResponse as Response,
//             nextFunction
//         );

//         expect(mockRequest.user?.role).toBe('guest');
//         expect(nextFunction).toHaveBeenCalled();
//     });

//     it('should throw Unauthorized error when userId is missing', async () => {
//         mockRequest.headers = {
//             'x-api-key': 'test-api-key-123'
//         };

//         await authMiddleware(
//             mockRequest as Request,
//             mockResponse as Response,
//             nextFunction
//         );

//         expect(nextFunction).toHaveBeenCalledWith(expect.any(AppError));
//         expect(nextFunction.mock.calls[0][0].name).toBe('Unauthorized');
//     });

//     it('should throw Unauthorized error when apiKey is missing', async () => {
//         mockRequest.headers = {
//             'x-user-id': 'test-user-id'
//         };

//         await authMiddleware(
//             mockRequest as Request,
//             mockResponse as Response,
//             nextFunction
//         );

//         expect(nextFunction).toHaveBeenCalledWith(expect.any(AppError));
//         expect(nextFunction.mock.calls[0][0].name).toBe('Unauthorized');
//     });

//     it('should throw InvalidApiKey error when API key is invalid', async () => {
//         if (!mockRequest.headers) {
//             throw new Error('Not implemented'); 
//         }
//         mockRequest.headers['x-api-key'] = 'invalid-api-key';

//         await authMiddleware(
//             mockRequest as Request,
//             mockResponse as Response,
//             nextFunction
//         );

//         expect(nextFunction).toHaveBeenCalledWith(expect.any(AppError));
//         expect(nextFunction.mock.calls[0][0].name).toBe('InvalidApiKey');
//     });

//     it('should throw UserNotFound error when user details are not found', async () => {
//         mockGetUserDetails.mockResolvedValue([]);

//         await authMiddleware(
//             mockRequest as Request,
//             mockResponse as Response,
//             nextFunction
//         );

//         expect(nextFunction).toHaveBeenCalledWith(expect.any(AppError));
//         expect(nextFunction.mock.calls[0][0].name).toBe('UserNotFound');
//     });

//     it('should throw InvalidApiKey error when VALID_API_KEY env variable is not set', async () => {
//         process.env.VALID_API_KEY = '';

//         await authMiddleware(
//             mockRequest as Request,
//             mockResponse as Response,
//             nextFunction
//         );

//         expect(nextFunction).toHaveBeenCalledWith(expect.any(AppError));
//         expect(nextFunction.mock.calls[0][0].name).toBe('InvalidApiKey');
//     });

//     it('should handle service errors gracefully', async () => {
//         const testError = new Error('Database connection failed');
//         mockGetUserDetails.mockRejectedValue(testError);

//         await authMiddleware(
//             mockRequest as Request,
//             mockResponse as Response,
//             nextFunction
//         );

//         expect(nextFunction).toHaveBeenCalledWith(testError);
//     });

//     it('should properly set user payload with all fields', async () => {
//         mockGetUserDetails.mockResolvedValue([{
//             id: 'test-user-id',
//             username: 'testuser',
//             email: 'test@example.com',
//             additionalField: 'should-not-be-included'
//         }]);

//         await authMiddleware(
//             mockRequest as Request,
//             mockResponse as Response,
//             nextFunction
//         );

//         expect(mockRequest.user).toEqual({
//             id: 'test-user-id',
//             name: 'testuser',
//             email: 'test@example.com',
//             role: 'user'
//         });
//     });
// });