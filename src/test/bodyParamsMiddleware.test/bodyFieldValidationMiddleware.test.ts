// import { Request, Response, NextFunction } from 'express';
// import { bodyFieldValidationMiddleware } from '@/middleware/bodyParamsMiddleware';
// import { AuthConfig } from '@/validation/config';
// import AppError from '@/utils/AppError';
// import { validatePayload } from '@/utils/PayloadValidations';
// import { z } from 'zod';
// import { userMock } from '@/test/utils/commonMock';

// // Mock dependencies
// jest.mock('@/validation/config', () => ({
//   AuthConfig: {
//     endpoints: {
//       createUser: {
//         path: '/api/users',
//         method: 'POST',
//         apiAllowedRole: ['admin', 'manager'],
//         roles: {
//           admin: {
//             allowedFields: ['name', 'email', 'role']
//           },
//           manager: {
//             allowedFields: ['name', 'email']
//           }
//         },
//         validateSchema: z.object({
//           name: z.string(),
//           email: z.string().email(),
//           role: z.string().optional()
//         })
//       },
//       updateUser: {
//         path: '/api/users',
//         method: 'PUT',
//         apiAllowedRole: ['admin'],
//         roles: {
//           admin: {
//             allowedFields: ['name', 'email']
//           }
//         }
//       }
//     }
//   }
// }));

// jest.mock('@/utils/PayloadValidations', () => ({
//   validatePayload: jest.fn()
// }));

// describe('bodyFieldValidationMiddleware', () => {
//   let mockRequest: Partial<Request>;
//   let mockResponse: Partial<Response>;
//   let nextFunction: NextFunction;

//   beforeEach(() => {
//     mockRequest = {
//       method: 'POST',
//       originalUrl: '/api/users',
//       baseUrl: '/api',
//       route: { path: '/users' },
//       user: userMock,
//       body: {}
//     };
//     mockResponse = {
//       json: jest.fn()
//     };
//     nextFunction = jest.fn();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should allow valid fields for admin role', () => {
//     mockRequest.body = {
//       name: 'John Doe',
//       email: 'john@example.com',
//       role: 'user'
//     };

//     bodyFieldValidationMiddleware(
//       mockRequest as Request,
//       mockResponse as Response,
//       nextFunction
//     );

//     expect(nextFunction).toHaveBeenCalled();
//     expect(mockRequest.body).toEqual({
//       name: 'John Doe',
//       email: 'john@example.com',
//       role: 'user'
//     });
//     expect(validatePayload).toHaveBeenCalled();
//   });

//   it('should remove invalid fields from request body', () => {
//     mockRequest.body = {
//       name: 'John Doe',
//       email: 'john@example.com',
//       password: 'secret', // unauthorized field
//       role: 'user'
//     };

//     expect(() => {
//       bodyFieldValidationMiddleware(
//         mockRequest as Request,
//         mockResponse as Response,
//         nextFunction
//       );
//     }).toThrow(AppError);
//   });

//   it('should throw error for unauthorized role', () => {
//     mockRequest.user = userMock;
//     mockRequest.body = {
//       name: 'John Doe',
//       email: 'john@example.com'
//     };

//     expect(() => {
//       bodyFieldValidationMiddleware(
//         mockRequest as Request,
//         mockResponse as Response,
//         nextFunction
//       );
//     }).toThrow(AppError);
//   });

//   it('should throw error for invalid endpoint', () => {
//     mockRequest.originalUrl = '/api/invalid';
//     mockRequest.route = { path: '/invalid' };
//     mockRequest.body = {
//       name: 'John Doe'
//     };

//     expect(() => {
//       bodyFieldValidationMiddleware(
//         mockRequest as Request,
//         mockResponse as Response,
//         nextFunction
//       );
//     }).toThrow(AppError);
//   });

//   it('should handle manager role with restricted fields', () => {
//     mockRequest.user = userMock;
//     mockRequest.body = {
//       name: 'John Doe',
//       email: 'john@example.com'
//     };

//     bodyFieldValidationMiddleware(
//       mockRequest as Request,
//       mockResponse as Response,
//       nextFunction
//     );

//     expect(nextFunction).toHaveBeenCalled();
//     expect(mockRequest.body).toEqual({
//       name: 'John Doe',
//       email: 'john@example.com'
//     });
//   });

//   it('should throw error when manager tries to access restricted fields', () => {
//     mockRequest.user = userMock;
//     mockRequest.body = {
//       name: 'John Doe',
//       email: 'john@example.com',
//       role: 'user' // not allowed for manager
//     };

//     expect(() => {
//       bodyFieldValidationMiddleware(
//         mockRequest as Request,
//         mockResponse as Response,
//         nextFunction
//       );
//     }).toThrow(AppError);
//   });

//   it('should handle PUT requests', () => {
//     mockRequest.method = 'PUT';
//     mockRequest.body = {
//       name: 'John Doe',
//       email: 'john@example.com'
//     };

//     bodyFieldValidationMiddleware(
//       mockRequest as Request,
//       mockResponse as Response,
//       nextFunction
//     );

//     expect(nextFunction).toHaveBeenCalled();
//     expect(mockRequest.body).toEqual({
//       name: 'John Doe',
//       email: 'john@example.com'
//     });
//   });

//   it('should throw error for empty sanitized body', () => {
//     mockRequest.body = {
//       invalidField: 'value'
//     };

//     expect(() => {
//       bodyFieldValidationMiddleware(
//         mockRequest as Request,
//         mockResponse as Response,
//         nextFunction
//       );
//     }).toThrow(AppError);
//   });
// });