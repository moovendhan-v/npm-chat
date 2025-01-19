// import { Request, Response, NextFunction } from 'express';
// import { ZodError } from 'zod';
// import errorHandlerMiddleware from '@/middleware/errorHandlerMiddleware';
// import AppError from '@/utils/AppError';
// import DatabaseError from '@/utils/DatabaseError';
// import * as PrismaErrorHandler from '@/utils/error_handler/prismaErrorHandler';
// import { ErrorConfig } from '@/utils/error_handler/errorConfig';
// import { ErrorConfig as PrismaErrorConfig } from '@/utils/error_handler/databaseErrorConfig';
// import { userMock } from '@/test/utils/commonMock';

// // Mock the handlePrismaError function
// jest.mock('@/utils/error_handler/prismaErrorHandler', () => ({
//   handlePrismaError: jest.fn()
// }));

// describe('errorHandlerMiddleware', () => {
//   let mockRequest: Partial<Request>;
//   let mockResponse: Partial<Response>;
//   let nextFunction: jest.Mock;
//   let jsonMock: jest.Mock;
//   let statusMock: jest.Mock;

//   beforeEach(() => {
//     // Clear console.error and console.log mocks between tests
//     jest.spyOn(console, 'error').mockImplementation(() => {});
//     jest.spyOn(console, 'log').mockImplementation(() => {});

//     jsonMock = jest.fn();
//     statusMock = jest.fn().mockReturnValue({ json: jsonMock });

//     mockRequest = {
//       originalUrl: '/test/path',
//       user: userMock
//     };

//     mockResponse = {
//       status: statusMock,
//       json: jsonMock
//     };

//     nextFunction = jest.fn();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('AppError Handling', () => {
//     it('should handle AppError with valid error type', () => {
//       const appError = new AppError('InvalidApiKey', {
//         dynamicMessage: 'Invalid API key for {role}',
//         validationErrors: [{ path: 'apiKey', message: 'Invalid key' }]
//       });

//       errorHandlerMiddleware(
//         appError,
//         mockRequest as Request,
//         mockResponse as Response,
//         nextFunction
//       );

//       expect(statusMock).toHaveBeenCalledWith(401);
//       expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
//         status: 'error',
//         code: '4011',
//         message: 'Invalid API key for user',
//         details: expect.objectContaining({
//           errorType: 'InvalidApiKey',
//           validationErrors: [{ path: 'apiKey', message: 'Invalid key' }]
//         })
//       }));
//     });

//     it('should handle AppError with unknown error type', () => {
//       const appError = new AppError('UnknownType' as any);

//       errorHandlerMiddleware(
//         appError,
//         mockRequest as Request,
//         mockResponse as Response,
//         nextFunction
//       );

//       expect(statusMock).toHaveBeenCalledWith(500);
//       expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
//         status: 'error',
//         code: '5001',
//         message: 'Unknown application error occurred.'
//       }));
//     });
//   });

//   describe('Database Error Handling', () => {
//     it('should handle DatabaseError with valid error type', () => {
//       const dbError = new DatabaseError('UniqueConstraintViolation', {
//         dynamicMessage: 'Duplicate entry found',
//         validationErrors: [{ path: 'email', message: 'Already exists' }]
//       });

//       errorHandlerMiddleware(
//         dbError,
//         mockRequest as Request,
//         mockResponse as Response,
//         nextFunction
//       );

//       expect(statusMock).toHaveBeenCalledWith(409);
//       expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
//         status: 'error',
//         details: expect.objectContaining({
//           errorType: 'UniqueConstraintViolation',
//           validationErrors: [{ path: 'email', message: 'Already exists' }]
//         })
//       }));
//     });

//     it('should handle DatabaseError with unknown error type', () => {
//       const dbError = new DatabaseError('UnknownType' as any);

//       errorHandlerMiddleware(
//         dbError,
//         mockRequest as Request,
//         mockResponse as Response,
//         nextFunction
//       );

//       expect(statusMock).toHaveBeenCalledWith(500);
//       expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
//         status: 'error',
//         code: '5001',
//         message: 'Unknown database error occurred.'
//       }));
//     });
//   });

//   describe('Prisma Error Handling', () => {
//     it('should handle Prisma error with valid error type', () => {
//       const prismaError = new Error('Prisma error');
//       (PrismaErrorHandler.handlePrismaError as jest.Mock).mockReturnValue({
//         errorType: 'UniqueConstraintViolation'
//       });

//       errorHandlerMiddleware(
//         prismaError,
//         mockRequest as Request,
//         mockResponse as Response,
//         nextFunction
//       );

//       expect(statusMock).toHaveBeenCalledWith(409);
//       expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
//         status: 'error',
//         code: '4091'
//       }));
//     });

//     it('should handle Prisma error with unknown error type', () => {
//       const prismaError = new Error('Unknown Prisma error');
//       (PrismaErrorHandler.handlePrismaError as jest.Mock).mockReturnValue({
//         errorType: 'UnknownType'
//       });

//       errorHandlerMiddleware(
//         prismaError,
//         mockRequest as Request,
//         mockResponse as Response,
//         nextFunction
//       );

//       expect(statusMock).toHaveBeenCalledWith(500);
//       expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
//         status: 'error',
//         code: '5001',
//         message: 'Unknown Prisma error occurred.'
//       }));
//     });
//   });

//   describe('Zod Error Handling', () => {
//     it('should handle ZodError', () => {
//       const zodError = new ZodError([{
//         code: 'invalid_type',
//         expected: 'string',
//         received: 'number',
//         path: ['email'],
//         message: 'Expected string, received number'
//       }]);

//       errorHandlerMiddleware(
//         zodError,
//         mockRequest as Request,
//         mockResponse as Response,
//         nextFunction
//       );

//       expect(statusMock).toHaveBeenCalledWith(400);
//       expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
//         status: 'error',
//         code: '4000',
//         message: 'Validation failed',
//         details: expect.objectContaining({
//           errorType: 'VALIDATION_ERROR',
//           validationErrors: [{
//             path: 'email',
//             message: 'Expected string, received number'
//           }]
//         })
//       }));
//     });
//   });

//   describe('Unknown Error Handling', () => {
//     it('should handle unknown errors', () => {
//       const unknownError = { message: 'Some unknown error' };

//       errorHandlerMiddleware(
//         unknownError,
//         mockRequest as Request,
//         mockResponse as Response,
//         nextFunction
//       );

//       expect(statusMock).toHaveBeenCalledWith(500);
//       expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
//         status: 'error',
//         code: '5001',
//         message: 'An unexpected error occurred.',
//         details: expect.objectContaining({
//           errorType: 'INTERNAL_SERVER_ERROR'
//         })
//       }));
//     });
//   });

//   describe('Error Handler Error Handling', () => {
//     it('should handle errors thrown during error handling', () => {
//       // Mock status to throw an error
//       mockResponse.status = jest.fn().mockImplementation(() => {
//         throw new Error('Error in error handler');
//       });

//       errorHandlerMiddleware(
//         new Error('Original error'),
//         mockRequest as Request,
//         mockResponse as Response,
//         nextFunction
//       );

//       expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
//         status: 'error',
//         code: '5002',
//         message: 'Critical error in error handling middleware'
//       }));
//     });
//   });
// });