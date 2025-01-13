import { RegexTypes } from '@/utils/Regex';
import { z } from 'zod';

// Schema for creating a one-on-one chat
export const createChatSchema = z.object({
    senderId: z.string()
        .regex(RegexTypes.objectIdRegex.regex, { message: "Sender ID must be a valid ObjectId" })
        .trim(),
    receiverId: z.string()
        .regex(RegexTypes.objectIdRegex.regex, { message: "Receiver ID must be a valid ObjectId" })
        .trim()
}).strict()
    .refine(
        (data) => data.senderId !== data.receiverId,
        { message: "Sender and receiver cannot be the same user" }
    );

// Schema for sending a message
export const sendMessageSchema = z.object({
    chatId: z.string()
        .regex(RegexTypes.objectIdRegex.regex, { message: "Chat ID must be a valid ObjectId" })
        .trim(),
    senderId: z.string()
        .regex(RegexTypes.objectIdRegex.regex, { message: "Sender ID must be a valid ObjectId" })
        .trim(),
    content: z.string()
        .trim()
        .min(1, { message: "Message content cannot be empty" })
        .max(2000, { message: "Message content cannot exceed 2000 characters" })
}).strict();

// Schema for getting chat messages
export const getChatMessagesSchema = z.object({
    chatId: z.string()
        .regex(RegexTypes.objectIdRegex.regex, { message: "Chat ID must be a valid ObjectId" })
        .trim(),
    limit: z.number()
        .int()
        .min(1)
        .max(100)
        .optional()
        .default(50),
    page: z.number()
        .int()
        .min(1)
        .optional()
        .default(1),
}).strict();

// Schema for getting user chats
export const getUserChatsSchema = z.object({
    userId: z.string()
        .regex(RegexTypes.objectIdRegex.regex, { message: "User ID must be a valid ObjectId" })
        .trim(),
    limit: z.number()
        .int()
        .min(1)
        .max(50)
        .optional()
        .default(20),
    page: z.number()
        .int()
        .min(1)
        .optional()
        .default(1),
}).strict();

// Schema for reactions
export const addReactionSchema = z.object({
    messageId: z.string()
        .regex(RegexTypes.objectIdRegex.regex, { message: "Message ID must be a valid ObjectId" })
        .trim(),
    userId: z.string()
        .regex(RegexTypes.objectIdRegex.regex, { message: "User ID must be a valid ObjectId" })
        .trim(),
    type: z.enum(['like', 'love', 'laugh', 'wow', 'sad', 'angry'], {
        errorMap: () => ({ message: "Invalid reaction type" })
    })
}).strict();