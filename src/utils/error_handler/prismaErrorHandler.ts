// Define the possible error types (for Prisma error mappings)
export type ErrorType = 
  | 'ConflictException' 
  | 'NotFoundException' 
  | 'InternalServerError' 
  | 'Unauthorized' 
  | 'UserRoleNotAllowed' 
  | 'InvalidEndpoint' 
  | 'RoleFieldRestriction' 
  | 'InvalidFieldsException' 
  | 'PayloadValidationFailed'
  | 'BadRequestException'
  | 'ForeignKeyViolationException'
  | 'QueryException'
  | 'ValueTooLongException'
  | 'ConstraintViolationException'
  | 'MissingFieldException'
  | 'QueryParameterException'
  | 'InvalidIdentifierException';

// Define PrismaError with a nullable ErrorType to match the error code mapping
type PrismaError = {
  errorType: ErrorType | null;
};

// Prisma error handling function maps error codes to ErrorType values
export function handlePrismaError(error: any): PrismaError | null {
    switch (error.code) {
        case 'P2002':
            return { errorType: 'ConflictException' };
        case 'P2025':
            return { errorType: 'NotFoundException' };
        case 'P2011':
            return { errorType: 'BadRequestException' };
        case 'P2003':
            return { errorType: 'ForeignKeyViolationException' };
        case 'P2016':
            return { errorType: 'QueryException' };
        case 'P2000':
            return { errorType: 'ValueTooLongException' };
        case 'P2004':
            return { errorType: 'ConstraintViolationException' };
        case 'P2012':
            return { errorType: 'MissingFieldException' };
        case 'P2013':
            return { errorType: 'QueryParameterException' };
        case 'P2023':
            return { errorType: "InvalidIdentifierException"}
        default:
            return { errorType: null }; // No match for error code
    }
}
