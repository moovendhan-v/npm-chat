import { Request, Response, NextFunction } from "express";
import AppError from "@/utils/AppError";
import { ErrorConfig, ErrorType } from "@/utils/error_handler/errorConfig";
import DatabaseError from "@/utils/DatabaseError";
import { handlePrismaError, PrismaError } from "@/utils/error_handler/prismaErrorHandler";
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

  // Narrowing `err` for Prisma-specific errors
  const prismaError: PrismaError | null = handlePrismaError(err);
  console.log("prismaError", prismaError);

  if (prismaError?.errorType) {
    console.log("Prisma error triggered");

    if (typeof prismaError === "object" && prismaError !== null && "errorType" in prismaError) {
      const errorType = (prismaError as { errorType: keyof typeof PrismaErrorConfig }).errorType || "InternalServerError";
      const errorDetail = PrismaErrorConfig[errorType] || PrismaErrorConfig["InternalServerError"];

      let dynamicMessage = errorDetail.message
        .replace("{role}", req.user?.role || "unknown")
        .replace("{path}", req.originalUrl);

      return res.status(parseInt(errorDetail.code, 10) || 400).json({
        status: "error",
        code: errorDetail.code,
        message: errorDetail.message,
        details: {
          errorType: errorDetail.type,
          userRole: req.user?.role || "unknown",
          attemptedPath: req.originalUrl,
          dynamicErrMessage: dynamicMessage,
          validationErrors: (prismaError as { validationErrors?: unknown[] }).validationErrors || [],
        },
      });
    }
  }

  // Narrowing `err` for AppError
  if (err instanceof AppError) {
    console.log("AppError triggered");
    const errorType = err.type as ErrorType;
    const errorDetail = ErrorConfig[errorType] || ErrorConfig["InternalServerError"];

    let dynamicMessage = err.dynamicMessage || errorDetail.message;
    dynamicMessage = dynamicMessage
      .replace("{role}", req.user?.role || "unknown")
      .replace("{path}", req.originalUrl);

    return res.status(parseInt(errorDetail.code, 10) || 500).json({
      status: "error",
      code: errorDetail.code,
      message: errorDetail.message,
      details: {
        errorType: errorDetail.type,
        userRole: req.user?.role || "unknown",
        attemptedPath: req.originalUrl,
        dynamicErrMessage: dynamicMessage,
        validationErrors: err.validationErrors || [],
      },
    });
  }

  if (err instanceof DatabaseError) {
    console.log("Database error triggered");

    if (typeof err === "object" && err !== null && "type" in err) {
      const errorType = (err as { type: keyof typeof PrismaErrorConfig }).type;
      const errorDetail = PrismaErrorConfig[errorType] || PrismaErrorConfig["InternalServerError"];

      let dynamicMessage = err.dynamicMessage || errorDetail.message;
      dynamicMessage = dynamicMessage
        .replace("{role}", req.user?.role || "unknown")
        .replace("{path}", req.originalUrl);

      return res.status(parseInt(errorDetail.code, 10) || 400).json({
        status: "error",
        code: errorDetail.code,
        message: errorDetail.message,
        details: {
          errorType: errorDetail.type,
          userRole: req.user?.role || "unknown",
          attemptedPath: req.originalUrl,
          dynamicErrMessage: dynamicMessage,
          validationErrors: err.validationErrors || [],
        },
      });
    }
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
