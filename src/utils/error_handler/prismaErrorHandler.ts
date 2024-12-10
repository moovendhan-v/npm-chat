type PrismaErrorResponse = {
    statusCode: number;
    error: {
        errorType: string;
        errorCode: string;
        message: string;
        details?: Record<string, any>;
    }
};

export function handlePrismaError(error: any): PrismaErrorResponse | null {
    switch (error.code) {
        case 'P2002': {
            // Unique constraint violation
            const fieldName = error.meta?.target || "unknown field";
            return {
                statusCode: 409,
                error: {
                    errorType: "ConflictException",
                    errorCode: error.code,
                    message: `A record with the same value for the unique field '${fieldName}' already exists.`,
                    details: { field: fieldName },
                }

            };
        }

        case 'P2025': {
            // Record not found
            return {
                statusCode: 404,
                error: {
                    errorType: "NotFoundException",
                    errorCode: error.code,
                    message: "The requested record was not found.",
                }
            };
        }

        case 'P2011': {
            // Null constraint violation
            const fieldName = error.meta?.constraint || "unknown constraint";
            return {
                statusCode: 400,
                error: {
                    errorType: "BadRequestException",
                    errorCode: error.code,
                    message: `A null value was provided for the required field '${fieldName}'.`,
                    details: { field: fieldName },
                }
            };
        }

        case 'P2003': {
            // Foreign key constraint violation
            const fieldName = error.meta?.field_name || "unknown field";
            return {
                statusCode: 400,
                error: {
                    errorType: "ForeignKeyViolationException",
                    errorCode: error.code,
                    message: `Foreign key constraint failed on the field '${fieldName}'.`,
                    details: { field: fieldName },
                }
            };
        }

        case 'P2016': {
            // Query interpretation error
            return {
                statusCode: 400,
                error: {
                    errorType: "QueryException",
                    errorCode: error.code,
                    message: "Query interpretation error. Please verify your query syntax.",
                }
            };
        }

        case 'P2000': {
            // Value too long for column
            const column = error.meta?.column_name || "unknown column";
            return {
                statusCode: 400,
                error: {
                    errorType: "ValueTooLongException",
                    errorCode: error.code,
                    message: `The provided value for the column '${column}' is too long.`,
                    details: { column },
                }
            };
        }

        case 'P2004': {
            // Constraint violation
            return {
                statusCode: 400,
                error: {
                    errorType: "ConstraintViolationException",
                    errorCode: error.code,
                    message: "A constraint violation occurred. Please check your query or input data.",
                }
            };
        }

        case 'P2012': {
            // Missing required value
            const missingField = error.meta?.missing_field || "unknown field";
            return {
                statusCode: 400,
                error: {
                    errorType: "MissingFieldException",
                    errorCode: error.code,
                    message: `The required field '${missingField}' is missing.`,
                    details: { field: missingField },
                }
            };
        }

        case 'P2013': {
            // Missing parameter in query
            return {
                statusCode: 400,
                error: {
                    errorType: "QueryParameterException",
                    errorCode: error.code,
                    message: "A required parameter is missing in the query.",
                }
            };
        }

        default: {
            // Unhandled error
            return {
                statusCode: 500,
                error: {
                    errorType: "InternalServerError",
                    errorCode: "UNKNOWN_ERROR",
                    message: "An unexpected error occurred.",
                }
            };
        }
    }
}
