export interface RegexMeta {
    description: string;
    example: string;
}

export const RegexTypes = {
    objectIdRegex: {
        regex: /^[a-f\d]{24}$/i,
        meta: {
            description: "validate the mongodb objects",
            example: "6755c53f5d2f737f190d4df2"
        }
    },
    username: {
        regex: /^[a-zA-Z0-9_]{3,20}$/,
        meta: {
            description: "Validates a username (alphanumeric or underscore, 3-20 characters)",
            example: "moovendhan123",
        },
    },
    email: {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        meta: {
            description: "Validates an email address",
            example: "user@example.com",
        },
    },
    message: {
        regex: /^.{1,1000}$/, // Message length between 1 and 1000 characters
        meta: {
            description: "Validates the length of a chat message (1 to 1000 characters)",
            example: "Hello, how are you?",
        },
    },
    password: {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        meta: {
            description: "Validates a strong password (at least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special character)",
            example: "Passw0rd!",
        },
    },
    phoneNumber: {
        regex: /^\+?[1-9]\d{1,14}$/, // Matches international phone numbers (E.164 format)
        meta: {
            description: "Validates a phone number in international format",
            example: "+1234567890",
        },
    },
    url: {
        regex: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
        meta: {
            description: "Validates a URL (http, https, or ftp)",
            example: "https://www.example.com",
        },
    },
    chatRoomName: {
        regex: /^[a-zA-Z0-9\s]{1,50}$/, // Alphanumeric + spaces, length 1-50 characters
        meta: {
            description: "Validates a chat room name (alphanumeric or spaces, 1-50 characters)",
            example: "General Chat Room",
        },
    },
    emoji: {
        regex: /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}]/u,
        meta: {
            description: "Validates the presence of emojis in a message",
            example: "😊",
        },
    },
    mention: {
        regex: /@([a-zA-Z0-9_]{3,20})/, // Matches @username pattern
        meta: {
            description: "Validates a mention (e.g., @username)",
            example: "@moovendhan_v",
        },
    },
};
