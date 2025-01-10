import { userCreationSchema } from "@/validation/user/userValidations";

export const getUsers = Object.freeze({
    method: "GET",
    path: "/users",
    apiAllowedRole: ["admin", "manager", "user"],
    validateSchema: undefined,
    roles: {
        admin: {
            allowedFields: ["id", "username", "email", "name", "createdAt", "role", "isActive", "lastLogin"]
        },
        manager: {
            allowedFields: ["id", "username", "email", "name", "createdAt", "role"]
        },
        user: {
            allowedFields: ["id", "username", "email", "name", "createdAt"]
        },
        guest: {
            allowedFields: ["id", "userName", "email", "name", "createdAt"]
        }
    }
});

export const getAllUsers = Object.freeze({
    method: "GET",
    path: "/users/all",
    apiAllowedRole: ["admin", "manager", "user"],
    validateSchema: undefined,
    roles: {
        admin: {
            allowedFields: ["id", "username", "email"]
        },
        manager: {
            allowedFields: ["id", "username", "email"]
        },
        user: {
            allowedFields: ["id", "username", "email"]
        },
        guest: {
            allowedFields: ["id", "username", "email"]
        }
    }
});

export const createUser = Object.freeze({
    method: "POST",
    path: "/users",
    apiAllowedRole: ["admin", "manager", "user", "guest"],
    validateSchema: userCreationSchema,
    roles: {
        admin: {
            allowedFields: ["id", "userName", "email", "name", "createdAt", "role", "isActive"]
        },
        manager: {
            allowedFields: ["id", "userName", "email", "name", "role"]
        },
        user: {
            allowedFields: ["id", "userName", "email", "name"]
        },
        guest: {
            allowedFields: ["id", "userName", "email", "name", "createdAt", "role", "isActive"]
        }
    }
});