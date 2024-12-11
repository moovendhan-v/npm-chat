import { Request, Response, NextFunction } from "express";
import AppError from "@/utils/AppError"; // Adjust the import path as needed
import { ErrorConfig, ErrorType } from "@/utils/error_handler/errorConfig"; // Import error config

const errorHandlerMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("ErrorMiddleware", err);

  // Check if the error is an instance of AppError
  if (err instanceof AppError) {
    // Log error for debugging purposes
    const errorType = err.type as ErrorType;

    // Ensure the errorType is a valid key in ErrorConfig
    const errorDetail = ErrorConfig[errorType] || ErrorConfig['InternalServerError'];
    console.log("errorDetail", errorDetail);

    // Use dynamic message if provided, otherwise fallback to the message from ErrorConfig
    let dynamicMessage = err.dynamicMessage || errorDetail.message;

    // Dynamic message creation with placeholders for role and attempted path
    dynamicMessage = dynamicMessage.replace('{role}', req.user?.role || 'unknown')
      .replace('{path}', req.originalUrl);

    // Prepare the response
    return res.status(parseInt(errorDetail.code, 10) || 500).json({
      status: "error",
      code: errorDetail.code,
      message: errorDetail.message,
      details: {
        errorType: errorDetail.type,
        userRole: req.user?.role || 'unknown',
        attemptedPath: req?.originalUrl || "unknown",
        dynamicErrMessage: dynamicMessage // The full error message with dynamic values
      }
    });
  }

  // Handle unexpected errors
  console.error("Unknown error:", err);
  res.status(500).json({
    status: "error",
    code: 5001,
    message: "An unexpected error occurred.",
  });
};

export default errorHandlerMiddleware;
