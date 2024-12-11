// ErrorTypes.ts
export type ErrorType = 'TooManyRequest' | 'NotFound' | 'InternalServerError' | 'Unauthorized' | 'UserRoleNotAllowed' | 'InvalidEndpoint' | 'RoleFieldRestriction';

// ErrorDetails interface
export interface ErrorDetails {
  message: string;
  code: string;
  type: string;
}

// Example error config file (`ErrorConfig.ts`)
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
    message: 'You are not authorized to access this path.',
    code: '403',
    type: 'UserRoleNotAllowed',
  },
  InvalidEndpoint: {
    message: 'Invalid enpoints.',
    code: '404',
    type: 'InvalidEndpoint',
  },
  RoleFieldRestriction: {
    message: 'Please check you fiels some fields are not authorised to for this role',
    code: '404',
    type: 'RoleFieldRestriction',
  },
};

export default ErrorConfig;
