import { z, ZodError, ZodSchema, ZodType } from 'zod';
import AppError from './AppError';

export const validatePayload = <T>(schema: ZodSchema<T> | undefined, data: unknown): T | null => {
  // If no schema is provided (undefined), use a fallback schema that doesn't enforce validation
  if (!schema) {
    console.log("No schema provided, skipping validation.");
    return data as T; // Return the data as is
  }

  try {
    const validatedData = schema.parse(data);
    console.log("Validation successful:", validatedData);
    return validatedData;
  } catch (error) {
    console.log("Error during payload validation", error);

    if (error instanceof ZodError) {
      const validationErrors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      throw new AppError("PayloadValidationFailed", {
        dynamicMessage: "Check your input",
        validationErrors,
      });
    }

    // Rethrow the error if it's not a ZodError
    throw error;
  }
};
