import { ErrorType as DatabaseErrorType, ErrorConfig } from '@/utils/error_handler/DatabaseErrorConfig';
import AppError from '@/utils/AppError';

class DatabaseError extends AppError {
    constructor(type: DatabaseErrorType, details: any) {
        super(type, ErrorConfig, {
            dynamicMessage: details?.dynamicMessage,
            validationErrors: details?.validationErrors
        });
        this.name = 'DatabaseError';
    }
}

export interface DatabaseErrorContext {
    modelName?: string;
    fieldName?: string;
    operation?: string;
    details?: Record<string, any>;
}

export function handleDatabaseError(
    error: any,
    context: DatabaseErrorContext = {}
): DatabaseError | null {
    let errorType: DatabaseErrorType;

    // Determine error type based on error characteristics
    if (error.name === 'ValidationError') {
        errorType = 'ValidationException';
    } else if (error.name === 'MongoError') {
        switch (error.code) {
            case 11000:
                errorType = 'DuplicateKeyException';
                break;
            default:
                errorType = 'DatabaseOperationException';
        }
    } else if (error instanceof TypeError) {
        errorType = 'TypeMismatchException';
    } else if (error instanceof ReferenceError) {
        errorType = 'ReferenceException';
    } else {
        errorType = 'UnknownDatabaseError';
    }

    // Handle specific error scenarios using DatabaseError
    switch (errorType) {
        case 'DuplicateKeyException': {
            const fieldName = context.fieldName || 'unknown field';
            return new DatabaseError(errorType, {
                dynamicMessage: `A record with the same ${fieldName} already exists.`,
                validationErrors: [
                    {
                        field: fieldName,
                        message: 'Duplicate key violation',
                    },
                ],
            });
        }

        case 'ValidationException': {
            const validationErrors = error.errors
                ? Object.keys(error.errors).map(field => ({
                    field,
                    message: error.errors[field].message,
                }))
                : [
                    {
                        field: context.fieldName || 'unknown',
                        message: error.message,
                    },
                ];

            return new DatabaseError(errorType, {
                dynamicMessage: `Validation failed for ${context.modelName || 'model'}`,
                validationErrors,
            });
        }

        case 'TypeMismatchException': {
            return new DatabaseError(errorType, {
                dynamicMessage: `Type mismatch in ${context.operation || 'database operation'}`,
                validationErrors: [
                    {
                        field: context.fieldName || 'unknown',
                        message: 'Incorrect data type',
                    },
                ],
            });
        }

        case 'ReferenceException': {
            return new DatabaseError(errorType, {
                dynamicMessage: `Reference error in ${context.operation || 'database operation'}`,
                validationErrors: [
                    {
                        field: context.fieldName || 'unknown',
                        message: 'Undefined reference',
                    },
                ],
            });
        }

        default: {
            return new DatabaseError(errorType, {
                dynamicMessage: error.message || 'An unexpected database error occurred',
                validationErrors: context.details
                    ? Object.entries(context.details).map(([field, message]) => ({
                        field,
                        message,
                    }))
                    : undefined,
            });
        }
    }
}

// Utility function to throw the database error
export function throwDatabaseError(
    error: any,
    context: DatabaseErrorContext = {}
): never {
    const dbError = handleDatabaseError(error, context);
    if (dbError) {
        throw dbError;
    }
    throw error;
}

export default DatabaseError;
