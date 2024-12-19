import {channelCreationSchema} from "@/validation/channels/channelsValidations"

export const createChannels = Object.freeze({
    method: "POST",
    path: "/channels",
    apiAllowedRole: ["admin", "manager", "user", "guest"],
    validateSchema: channelCreationSchema,
    roles: {
        admin: {
            allowedFields: ["userId", "description", "name", "isAdmin"]
        },
        manager: {
            allowedFields: ["userId", "description", "name", "isAdmin"]
        },
        user: {
            allowedFields: ["userId", "description", "name", "isAdmin"]
        },
        guest: {
            allowedFields: ["userId", "description", "name", "isAdmin"]
        }
    }
});

export const getChannels = Object.freeze({
    method: "GET",
    path: "/channels",
    apiAllowedRole: ["admin", "manager", "user", "guest"],
    validateSchema: undefined,
    roles: {
        admin: {
            allowedFields: ["userId", "description", "name", "isAdmin"]
        },
        manager: {
            allowedFields: ["userId", "description", "name", "isAdmin"]
        },
        user: {
            allowedFields: ["userId", "description", "name", "isAdmin"]
        },
        guest: {
            allowedFields: ["userId", "description", "name", "isAdmin"]
        }
    }
});

export const getAllChannels = Object.freeze({
    method: "GET",
    path: "/groups/all",
    apiAllowedRole: ["admin", "manager", "user", "guest"],
    validateSchema: undefined,
    roles: {
        admin: {
            allowedFields: ["userId", "description", "name", "isAdmin"]
        },
        manager: {
            allowedFields: ["userId", "description", "name", "isAdmin"]
        },
        user: {
            allowedFields: ["userId", "description", "name", "isAdmin"]
        },
        guest: {
            allowedFields: ["id", "name", "members"]
        }
    }
});