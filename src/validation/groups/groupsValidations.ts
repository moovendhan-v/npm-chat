import { RegexTypes } from '@/utils/Regex';
import { z } from 'zod';

export const groupCreationSchema = z.object({
  name: z.string()
    .trim()
    .regex(RegexTypes.string.regex, {message: `Group Name ${RegexTypes.string.meta.description}`})
    .min(3, { message: "Group name must have at least 3 characters" })
    .max(20, { message: "Group name cannot exceed 20 characters" })
    .regex(/^[a-zA-Z0-9\s-]+$/, {
      message: "Group name can only contain letters, numbers, spaces, and hyphens"
    }),

  admins: z.array(
    z.string()
      .regex(RegexTypes.objectIdRegex.regex, { message: "Each admin ID must be a valid ObjectId" })
  )
    .min(1, { message: "At least one admin is required" })
    .max(5, { message: "Maximum 5 admins allowed" })
    .refine(
      (adminIds) => new Set(adminIds).size === adminIds.length,
      { message: "Duplicate admin IDs are not allowed" }
    ),

  members: z.array(
    z.string()
      .regex(RegexTypes.objectIdRegex.regex, { message: "Each member ID must be a valid ObjectId" })
  )
    .min(1, { message: "At least one member is required" })
    .max(50, { message: "Maximum 50 members allowed" })
    .refine(
      (memberIds) => new Set(memberIds).size === memberIds.length,
      { message: "Duplicate member IDs are not allowed" }
    )
    .optional(),
}).strict();
