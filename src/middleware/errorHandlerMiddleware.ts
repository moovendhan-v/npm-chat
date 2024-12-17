import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import AppError from "@/utils/AppError";
import DatabaseError from "@/utils/DatabaseError";
import { handlePrismaError, PrismaError } from "@/utils/error_handler/prismaErrorHandler";
import { ErrorConfig, ErrorType } from "@/utils/error_handler/errorConfig";
import { ErrorConfig as PrismaErrorConfig } from "@/utils/error_handler/databaseErrorConfig";

// Custom type guards
const isAppError = (error: unknown): error is AppError =>
  error instanceof AppError;

const isDatabaseError = (error: unknown): error is DatabaseError =>
  error instanceof DatabaseError;

const isError = (error: unknown): error is PrismaError =>
  error instanceof Error;

const isZodError = (error: unknown): error is ZodError =>
  error instanceof ZodError;

// Comprehensive error logging function
const logErrorDetails = (err: unknown, prismaError: PrismaError | null) => {
  console.error("=== Error Details ===");

  // if (err && typeof err === 'object') {
  //   console.error("Error Object Properties:", Object.keys(err));
  // }
  
  console.error("Error Type:", err?.constructor?.name);
  
  // Log error instance properties
  if (err instanceof Error) {
    console.error("Error Name:", err.name);
    console.error("Error Message:", err.message);
    console.error("Error Stack:", err.stack);
  }

  // Additional specific error type logging
  if (isAppError(err)) {
    console.error("AppError Type:", err.type);
    console.error("Dynamic Message:", err.dynamicMessage);
    console.error("Validation Errors:", err.validationErrors);
  }

  if (isError(err) && prismaError?.errorType) {
    console.error("Prisma Error Type:", (err as any).errorType);
  }

  if (isZodError(err)) {
    console.error("Zod Validation Errors:", err.errors.map(error => ({
      path: error.path,
      message: error.message
    })));
  }

  // Log the entire error object for inspection
  console.error("Full Error Object:", err);
};

// Main error handling middleware
const errorHandlerMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log comprehensive error details
  const prismaError = handlePrismaError(err);
  console.log("prismaError", prismaError?.errorType);
  logErrorDetails(err, prismaError);

  try {

    console.log("isError(err)", isError(err))
    // Handle Prisma-specific errors
    if (isError(err) && prismaError?.errorType) {
      const prismaErrorType = prismaError.errorType;
      console.log("PRISMA ERROR TYPE:", prismaErrorType);

      if (!prismaErrorType || !Object.keys(PrismaErrorConfig).includes(prismaErrorType)) {
        return res.status(500).json(createErrorResponse(req, {
          statusCode: 500,
          code: "5001",
          message: "Unknown Prisma error occurred.",
          type: "UNKNOWN_PRISMA_ERROR"
        }));
      }

      const errorDetail = PrismaErrorConfig[prismaErrorType as keyof typeof PrismaErrorConfig];
      return res.status(errorDetail.statusCode).json(createErrorResponse(req, errorDetail));
    }

    // Handle custom AppError
    if (isAppError(err)) {
      const errorType = err.type as ErrorType;
      console.log("APP ERROR TYPE:", errorType);

      if (!errorType || !Object.keys(ErrorConfig).includes(errorType)) {
        return res.status(500).json(createErrorResponse(req, {
          statusCode: 500,
          code: "5001",
          message: "Unknown application error occurred.",
          type: "UNKNOWN_APP_ERROR"
        }));
      }

      const errorDetail = ErrorConfig[errorType];
      return res.status(parseInt(errorDetail.code, 10) || 400)
        .json(createErrorResponse(req, {
          ...errorDetail,
          statusCode: parseInt(errorDetail.code, 10) || 400
        }, {
          validationErrors: err.validationErrors || [],
          dynamicMessage: err.dynamicMessage
        }));
    }

    // Handle Database Errors
    if (isDatabaseError(err)) {
      const errorType = err.type;
      console.log("DATABASE ERROR TYPE:", errorType);

      if (!errorType || !Object.keys(PrismaErrorConfig).includes(errorType)) {
        return res.status(500).json(createErrorResponse(req, {
          statusCode: 500,
          code: "5001",
          message: "Unknown database error occurred.",
          type: "UNKNOWN_DATABASE_ERROR"
        }));
      }

      const errorDetail = PrismaErrorConfig[errorType as keyof typeof PrismaErrorConfig];
      return res.status(errorDetail.statusCode).json(createErrorResponse(req, errorDetail, {
        validationErrors: err.validationErrors || [],
        dynamicMessage: err.dynamicMessage
      }));
    }

    // Handle Zod validation errors
    if (isZodError(err)) {
      return res.status(400).json(createErrorResponse(req, {
        statusCode: 400,
        code: "4000",
        message: "Validation failed",
        type: "VALIDATION_ERROR"
      }, {
        validationErrors: err.errors.map(error => ({
          path: error.path.join('.'),
          message: error.message
        }))
      }));
    }

    // Fallback for unexpected errors
    return res.status(500).json(createErrorResponse(req, {
      statusCode: 500,
      code: "5001",
      message: "An unexpected error occurred.",
      type: "INTERNAL_SERVER_ERROR"
    }));
  } catch (handlingError) {
    // Catch any errors that might occur during error handling itself
    console.error("Error in error handler:", handlingError);
    return res.status(500).json({
      status: "error",
      code: "5002",
      message: "Critical error in error handling middleware"
    });
  }
};

export default errorHandlerMiddleware;

// Error response helper (kept from previous implementation)
const createErrorResponse = (
  req: Request,
  errorDetail: {
    statusCode: number,
    code: string,
    message: string,
    type: string
  },
  additionalDetails: Record<string, any> = {}
) => {
  const dynamicMessage = errorDetail.message
    .replace("{role}", req.user?.role || "unknown")
    .replace("{path}", req.originalUrl);

  return {
    status: "error",
    code: errorDetail.code,
    message: dynamicMessage,
    details: {
      errorType: errorDetail.type,
      userRole: req.user?.role || "unknown",
      attemptedPath: req.originalUrl,
      ...additionalDetails
    }
  };
};