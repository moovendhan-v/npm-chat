import { ErrorConfig, ErrorType, ErrorDetails } from '@/utils/error_handler/databaseErrorConfig';
import { handlePrismaError } from './error_handler/prismaErrorHandler';
import { ErrorType as PrismaErrorConfig } from "@/utils/error_handler/prismaErrorHandler";

// DatabaseError class for handling Prisma errors
class DatabaseError extends Error {
  public code!: string;
  public type!: PrismaErrorConfig | null;
  public status!: string;
  public isOperational!: boolean;
  public dynamicMessage?: string;
  public validationErrors?: { field: string; message: string }[];

  // Constructor now accepts error or direct errorType
  constructor({
    dynamicMessage,
    validationErrors,
    error,
    errorType, // Default value for errorType
  }: {
    dynamicMessage?: string;
    validationErrors?: { field: string; message: string }[];
    error?: any; // Prisma error object passed from handlePrismaError
    errorType?: PrismaErrorConfig | null; // Direct errorType if needed
  } = {}) {
    super('An error occurred');
    this.dynamicMessage = dynamicMessage;
    this.validationErrors = validationErrors;

    // Initialize with error type from Prisma if available, otherwise use provided errorType
    this.initialize(errorType ?? null).catch((err) => {
      this.message = 'Unknown error occurred.';
      this.code = '500';
      this.type = errorType ?? null; // Default to null if no errorType is provided
      this.status = 'Server Error';
      this.isOperational = true;
      console.error('Error initializing DatabaseError:', err);
    });
  }

  // Initialize the error based on ErrorType (from ErrorConfig)
  private async initialize(type: PrismaErrorConfig | null): Promise<void> {
    console.log("DatabaseErrorType", type);
    try {
      const errorDetails = await DatabaseError.loadErrorConfig(type);
      console.log("databaseErrorDetails", errorDetails);
      if (errorDetails) {
        this.message = this.dynamicMessage || errorDetails.message;
        this.code = errorDetails.code;
        this.type = type;
        this.status = this.code.startsWith('4') ? 'Client Error' : 'Server Error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.message = 'Unknown error occurred.';
        this.code = '500';
        this.type = type;
        this.status = 'Server Error';
        this.isOperational = true;
      }
    } catch (error) {
      this.message = 'Unknown error occurred.';
      this.code = '500';
      this.type = type;
      this.status = 'Server Error';
      this.isOperational = true;
    }
  }

  // Static method to load error configuration from the ErrorConfig
  static async loadErrorConfig(type: PrismaErrorConfig | null): Promise<ErrorDetails | null> {
    if (!type || !(type in ErrorConfig)) {
      // Handle the case where the type is null or invalid
      console.error('Invalid error type or missing error type');
      return null;
    }

    try {
      // Type assertion to tell TypeScript that the type exists in ErrorConfig
      const errorConfig = ErrorConfig[type as keyof typeof ErrorConfig]; // Ensure type is valid
      return errorConfig;
    } catch (error) {
      console.error('Error loading error config:', error);
      return null;
    }
  }

}

export default DatabaseError;
