import { ErrorConfig, ErrorType, ErrorDetails } from '@/utils/error_handler/ErrorConfig';
import { ErrorType as DatabaseErrorType } from '@/utils/error_handler/DatabaseErrorConfig';

class AppError extends Error {
  public code!: string;
  public type!: string;
  public status!: string;
  public isOperational!: boolean;
  public dynamicMessage?: string;
  public validationErrors?: { field: string; message: string }[];

  constructor(
    type: ErrorType | DatabaseErrorType,
    config: Record<string, ErrorDetails>, // Accepts the configuration object
    { dynamicMessage, validationErrors }: { dynamicMessage?: string; validationErrors?: { field: string; message: string }[] } = {}
  ) {
    super('An error occurred');

    this.dynamicMessage = dynamicMessage;
    this.validationErrors = validationErrors;
    this.initialize(type, config).catch((err) => {
      this.message = 'Unknown error occurred.';
      this.code = '500';
      this.type = 'UnknownError';
      this.status = 'Server Error';
      this.isOperational = true;
      console.error('Error initializing AppError:', err);
    });
  }

  private async initialize(type: ErrorType | DatabaseErrorType, config: Record<string, ErrorDetails>): Promise<void> {
    try {
      const errorDetails = await AppError.loadErrorConfig(type, config);
      if (errorDetails) {
        this.message = this.dynamicMessage || errorDetails.message;
        this.code = errorDetails.code;
        this.type = errorDetails.type;
        this.status = this.code.startsWith('4') ? 'Client Error' : 'Server Error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
      } else {
        // Fallback
        this.message = 'Unknown error occurred.';
        this.code = '500';
        this.type = 'UnknownError';
        this.status = 'Server Error';
        this.isOperational = true;
      }
    } catch (error) {
      this.message = 'Unknown error occurred.';
      this.code = '500';
      this.type = 'UnknownError';
      this.status = 'Server Error';
      this.isOperational = true;
    }
  }

  static async loadErrorConfig(type: ErrorType | DatabaseErrorType, config: Record<string, ErrorDetails>): Promise<ErrorDetails | null> {
    try {
      return config[type] || null;
    } catch (error) {
      console.error('Error loading error config:', error);
      return null;
    }
  }
}

export default AppError;
