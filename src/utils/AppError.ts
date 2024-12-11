import { ErrorConfig, ErrorType, ErrorDetails } from '@/utils/error_handler/errorConfig';

class AppError extends Error {
  public code!: string;
  public type!: string;
  public status!: string;
  public isOperational!: boolean;
  public dynamicMessage?: string;

  constructor(type: ErrorType, { dynamicMessage }: { dynamicMessage?: string } = {}) {
    super('An error occurred');

    this.dynamicMessage = dynamicMessage;
    this.initialize(type).catch((err) => {
      this.message = 'Unknown error occurred.';
      this.code = '500';
      this.type = 'UnknownError';
      this.status = 'Server Error';
      this.isOperational = true;
      console.error('Error initializing AppError:', err);
    });
  }

  private async initialize(type: ErrorType): Promise<void> {
    try {
      const errorDetails = await AppError.loadErrorConfig(type);
      if (errorDetails) {
        this.message = this.dynamicMessage || errorDetails.message;
        this.code = errorDetails.code;
        this.type = errorDetails.type;
        this.status = this.code.startsWith('4') ? 'Client Error' : 'Server Error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
      } else {
        throw new Error('Invalid error type.');
      }
    } catch (error) {
      this.message = 'Unknown error occurred.';
      this.code = '500';
      this.type = 'UnknownError';
      this.status = 'Server Error';
      this.isOperational = true;
    }
  }

  static async loadErrorConfig(type: ErrorType): Promise<ErrorDetails | null> {
    try {
      return ErrorConfig[type] || null;
    } catch (error) {
      console.error('Error loading error config:', error);
      return null;
    }
  }
}

export default AppError;
