import { Request, Response, NextFunction } from "express";
import AppError from "@/utils/AppError"
import { ErrorConfig, ErrorType } from "@/utils/error_handler/errorConfig";
import DatabaseError from "@/utils/DatabaseError";
import { ErrorType as PrismaErrorType } from "@/utils/error_handler/prismaErrorHandler";
import { ErrorConfig as PrismaErrorConfig } from "@/utils/error_handler/databaseErrorConfig";


const errorHandlerMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  console.log("ErrorMiddleware Triggred");

  // Check if the error is an instance of AppError
  if (err instanceof AppError) {
    console.log("App error triggred")
    const errorType = err.type as ErrorType;
    const errorDetail = ErrorConfig[errorType as keyof typeof ErrorConfig] || ErrorConfig['InternalServerError'];

    let dynamicMessage = err.dynamicMessage || errorDetail.message;
    dynamicMessage = dynamicMessage.replace('{role}', req.user?.role || 'unknown')
      .replace('{path}', req.originalUrl);

    return res.status(parseInt(errorDetail.code, 10) || 500).json({
      status: "error",
      code: errorDetail.code,
      message: errorDetail.message,
      details: {
        errorType: errorDetail.type,
        userRole: req.user?.role || 'unknown',
        attemptedPath: req?.originalUrl || "unknown",
        dynamicErrMessage: dynamicMessage,
        validationErrors: err.validationErrors || []
      }
    });
  }

  if (err instanceof DatabaseError) {
    console.log("Error handler middlware triggred")
    const errorType = err.type as PrismaErrorType;
    const errorDetail = PrismaErrorConfig[errorType as keyof typeof PrismaErrorConfig] || PrismaErrorConfig['InternalServerError'];

    let dynamicMessage = err.dynamicMessage || errorDetail.message;
    dynamicMessage = dynamicMessage.replace('{role}', req.user?.role || 'unknown')
      .replace('{path}', req.originalUrl);

    const errorPayload = {
      status: "error",
      code: errorDetail.code,
      message: errorDetail.message,
      details: {
        errorType: errorDetail.type,
        userRole: req.user?.role || 'unknown',
        attemptedPath: req?.originalUrl || "unknown",
        dynamicErrMessage: dynamicMessage,
        validationErrors: err.validationErrors || []
      }
    };
    
    console.log("errorpayload", errorPayload)

    return res.status(parseInt(errorDetail.code, 10) || 400).json(errorPayload);
  }

  console.error("Unknown error:", err);

  // Default response for unexpected errors
  return res.status(500).json({
    status: "error",
    code: 5001,
    message: "An unexpected error occurred.",
  });
};

export default errorHandlerMiddleware;
