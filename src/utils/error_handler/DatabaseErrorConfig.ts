export interface ErrorDetails {
  message: string;
  code: string;
  type: string;
  statusCode: number;
}

export type ErrorType = 
  | 'InvalidIdentifierException'
  | 'ConflictException'
  | 'NotFoundException'
  | 'BadRequestException'
  | 'ForeignKeyViolationException'
  | 'QueryException'
  | 'ValueTooLongException'
  | 'ConstraintViolationException'
  | 'MissingFieldException'
  | 'QueryParameterException'
  | 'InternalServerError'
  | 'ValidationException'
  | 'DuplicateKeyException'
  | 'DatabaseOperationException'
  | 'TypeMismatchException'
  | 'ReferenceException'
  | 'UnknownDatabaseError';

export const ErrorConfig: Record<ErrorType, ErrorDetails> = {
  InvalidIdentifierException: {
    message: 'Invalid identifier provided. The ID format is incorrect.',
    code: 'P2023',
    type: 'InvalidIdentifierException',
    statusCode: 400
  },
  ConflictException: {
    message: 'A record with the same unique field value already exists.',
    code: 'P2002',
    type: 'ConflictException',
    statusCode: 409
  },
  NotFoundException: {
    message: 'The requested record was not found.',
    code: 'P2025',
    type: 'NotFoundException',
    statusCode: 404
  },
  BadRequestException: {
    message: 'A null value was provided for a required field.',
    code: 'P2011',
    type: 'BadRequestException',
    statusCode: 400
  },
  ForeignKeyViolationException: {
    message: 'Foreign key constraint failed.',
    code: 'P2003',
    type: 'ForeignKeyViolationException',
    statusCode: 400
  },
  QueryException: {
    message: 'Query interpretation error. Please verify your query syntax.',
    code: 'P2016',
    type: 'QueryException',
    statusCode: 400
  },
  ValueTooLongException: {
    message: 'The provided value for a column is too long.',
    code: 'P2000',
    type: 'ValueTooLongException',
    statusCode: 400
  },
  ConstraintViolationException: {
    message: 'A constraint violation occurred.',
    code: 'P2004',
    type: 'ConstraintViolationException',
    statusCode: 400
  },
  MissingFieldException: {
    message: 'A required field is missing.',
    code: 'P2012',
    type: 'MissingFieldException',
    statusCode: 400
  },
  QueryParameterException: {
    message: 'A required parameter is missing in the query.',
    code: 'P2013',
    type: 'QueryParameterException',
    statusCode: 400
  },
  InternalServerError: {
    message: 'An unexpected error occurred.',
    code: 'UNKNOWN_ERROR',
    type: 'InternalServerError',
    statusCode: 500
  },
  ValidationException: {
    message: 'Validation failed for the provided input.',
    code: 'VALIDATION_ERROR',
    type: 'ValidationException',
    statusCode: 400
  },
  DuplicateKeyException: {
    message: 'A record with the same field value already exists.',
    code: 'DUPLICATE_KEY_ERROR',
    type: 'DuplicateKeyException',
    statusCode: 409
  },
  DatabaseOperationException: {
    message: 'An error occurred during the database operation.',
    code: 'DB_OPERATION_ERROR',
    type: 'DatabaseOperationException',
    statusCode: 500
  },
  TypeMismatchException: {
    message: 'A type mismatch occurred during the operation.',
    code: 'TYPE_MISMATCH_ERROR',
    type: 'TypeMismatchException',
    statusCode: 400
  },
  ReferenceException: {
    message: 'An undefined reference was encountered.',
    code: 'REFERENCE_ERROR',
    type: 'ReferenceException',
    statusCode: 400
  },
  UnknownDatabaseError: {
    message: 'An unknown database error occurred.',
    code: 'UNKNOWN_DB_ERROR',
    type: 'UnknownDatabaseError',
    statusCode: 500
  }
};

export default ErrorConfig;
