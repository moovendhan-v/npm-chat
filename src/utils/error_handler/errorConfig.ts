export type ErrorType = 'TooManyRequest' 
| 'NotFound' 
| 'InternalServerError' 
| 'Unauthorized' 
| 'UserRoleNotAllowed' 
| 'InvalidEndpoint' 
| 'RoleFieldRestriction' 
| 'invalidFieldsException' 
| 'PayloadValidationFailed' 
| 'UserNotFound'
| 'InvalidApiKey';

// ErrorDetails interface
export interface ErrorDetails {
  message: string;
  code: string;
  type: string;
}

// ErrorConfig.ts
export const ErrorConfig: Record<ErrorType, ErrorDetails> = {
  TooManyRequest: {
    message: 'Too many requests. Please try again later.',
    code: '429',
    type: 'TooManyRequest',
  },
  NotFound: {
    message: 'The requested resource was not found.',
    code: '404',
    type: 'NotFound',
  },
  UserNotFound: {
    message: 'User not found.',
    code: '404',
    type: 'UserNotFound',
  },
  InvalidApiKey: {
    message: 'User not found.',
    code: '404',
    type: 'InvalidApiKey',
  },
  InternalServerError: {
    message: 'An unexpected error occurred. Please try again later.',
    code: '500',
    type: 'InternalServerError',
  },
  Unauthorized: {
    message: 'You are not authorized to access this resource.',
    code: '401',
    type: 'Unauthorized',
  },
  UserRoleNotAllowed: {
    message: 'Your user role does not have permission to access this resource.',
    code: '403',
    type: 'UserRoleNotAllowed',
  },
  InvalidEndpoint: {
    message: 'The requested endpoint is invalid or does not exist.',
    code: '404',
    type: 'InvalidEndpoint',
  },
  RoleFieldRestriction: {
    message: 'The fields in the request are not allowed for your user role.',
    code: '400',
    type: 'RoleFieldRestriction',
  },
  invalidFieldsException: {
    message: 'The provided fields in the request are not allowed for the user role or are invalid.',
    code: '400',
    type: 'invalidFieldsException',
  },
  PayloadValidationFailed: {
    message: 'Please check your input',
    code: '400',
    type: 'PayloadValidationFailed',
  },
};

export default ErrorConfig;
