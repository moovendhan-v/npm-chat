import {groupCreationSchema} from "@/validation/groups/groupsValidations"

export const createChannels = Object.freeze({
    method: "POST",
    path: "/channels",
    apiAllowedRole: ["admin", "manager", "user", "guest"],
    validateSchema: groupCreationSchema,
    roles: {
        admin: {
            allowedFields: ["id", "admins", "name", "members"]
        },
        manager: {
            allowedFields: ["id", "admins", "name", "members"]
        },
        user: {
            allowedFields: ["id", "admins", "name", "members"]
        },
        guest: {
            allowedFields: ["id", "admins", "name", "members", "guest"]
        }
    }
});

export const getChannels = Object.freeze({
    method: "GET",
    path: "/channels",
    apiAllowedRole: ["admin", "manager", "user", "guest"],
    validateSchema: groupCreationSchema,
    roles: {
        admin: {
            allowedFields: ["id", "admins", "name", "members"]
        },
        manager: {
            allowedFields: ["id", "admins", "name", "members"]
        },
        user: {
            allowedFields: ["id", "admins", "name", "members"]
        },
        guest: {
            allowedFields: ["id", "name", "members"]
        }
    }
});

export const getAllGroups = Object.freeze({
    method: "GET",
    path: "/groups/all",
    apiAllowedRole: ["admin", "manager", "user", "guest"],
    validateSchema: groupCreationSchema,
    roles: {
        admin: {
            allowedFields: ["id", "admins", "name", "members"]
        },
        manager: {
            allowedFields: ["id", "admins", "name", "members"]
        },
        user: {
            allowedFields: ["id", "admins", "name", "members"]
        },
        guest: {
            allowedFields: ["id", "name", "members"]
        }
    }
});