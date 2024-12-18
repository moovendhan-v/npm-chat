import { RegexTypes } from '@/utils/Regex';
import { z } from 'zod';

export const channelCreationSchema = z.object({
  name: z.string()
    .trim()
    .regex(RegexTypes.string.regex, {message: `Channel Name ${RegexTypes.string.meta.description}`})
    .min(3, { message: "Channel name must have at least 3 characters" })
    .max(20, { message: "Channel name cannot exceed 20 characters" })
    .regex(/^[a-zA-Z0-9\s-]+$/, {
      message: "Channel name can only contain letters, numbers, spaces, and hyphens"
    }),

  description: z.string()
    .min(5, { message: "Channle descriptions must have atlease 5 character" })
    .max(50, { message: "Channel description cannot exceed 50 character" }),

  userId: z.string()
    .regex(RegexTypes.objectIdRegex.regex, { message: "Invalid userid" }),

  isAdmin: z.boolean(),
}).strict();
