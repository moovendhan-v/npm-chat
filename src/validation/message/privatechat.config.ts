import { 
    createChatSchema, 
    sendMessageSchema, 
    getChatMessagesSchema, 
    getUserChatsSchema,
    addReactionSchema 
} from "@/validation/message/PrivateChatValidations";

export const createOneOnOneChat = Object.freeze({
    method: "POST",
    path: "/chats/private",
    apiAllowedRole: ["admin", "manager", "user"],
    validateSchema: createChatSchema,
    roles: {
        admin: {
            allowedFields: ["id", "senderId", "receiverId", "messages", "createdAt"]
        },
        manager: {
            allowedFields: ["id", "senderId", "receiverId", "messages", "createdAt"]
        },
        user: {
            allowedFields: ["id", "senderId", "receiverId", "messages", "createdAt"]
        }
    }
});

export const sendMessage = Object.freeze({
    method: "POST",
    path: "/chats/private/:chatId/messages",
    apiAllowedRole: ["admin", "manager", "user"],
    validateSchema: sendMessageSchema,
    roles: {
        admin: {
            allowedFields: ["id", "content", "senderId", "chatId", "createdAt", "reactions"]
        },
        manager: {
            allowedFields: ["id", "content", "senderId", "chatId", "createdAt", "reactions"]
        },
        user: {
            allowedFields: ["id", "content", "senderId", "chatId", "createdAt", "reactions"]
        }
    }
});

export const getChatMessages = Object.freeze({
    method: "GET",
    path: "/chats/private/:chatId/messages",
    apiAllowedRole: ["admin", "manager", "user"],
    validateSchema: getChatMessagesSchema,
    roles: {
        admin: {
            allowedFields: ["id", "content", "senderId", "chatId", "createdAt", "reactions", "sender"]
        },
        manager: {
            allowedFields: ["id", "content", "senderId", "chatId", "createdAt", "reactions", "sender"]
        },
        user: {
            allowedFields: ["id", "content", "senderId", "chatId", "createdAt", "reactions", "sender"]
        }
    }
});

export const getUserChats = Object.freeze({
    method: "GET",
    path: "/chats/private/user/:userId",
    apiAllowedRole: ["admin", "manager", "user"],
    validateSchema: getUserChatsSchema,
    roles: {
        admin: {
            allowedFields: ["id", "senderId", "receiverId", "messages", "createdAt", "sender", "receiver", "lastMessage"]
        },
        manager: {
            allowedFields: ["id", "senderId", "receiverId", "messages", "createdAt", "sender", "receiver", "lastMessage"]
        },
        user: {
            allowedFields: ["id", "senderId", "receiverId", "messages", "createdAt", "sender", "receiver", "lastMessage"]
        }
    }
});

export const addReaction = Object.freeze({
    method: "POST",
    path: "/chats/private/messages/:messageId/reactions",
    apiAllowedRole: ["admin", "manager", "user"],
    validateSchema: addReactionSchema,
    roles: {
        admin: {
            allowedFields: ["id", "type", "messageId", "userId", "createdAt"]
        },
        manager: {
            allowedFields: ["id", "type", "messageId", "userId", "createdAt"]
        },
        user: {
            allowedFields: ["id", "type", "messageId", "userId", "createdAt"]
        }
    }
});

export const deleteMessage = Object.freeze({
    method: "DELETE",
    path: "/chats/private/messages/:messageId",
    apiAllowedRole: ["admin", "manager", "user"],
    roles: {
        admin: {
            allowedFields: ["id", "messageId"]
        },
        manager: {
            allowedFields: ["id", "messageId"]
        },
        user: {
            allowedFields: ["id", "messageId"]
        }
    }
});