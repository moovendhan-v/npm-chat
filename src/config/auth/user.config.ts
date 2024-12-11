export const getUsers = Object.freeze({
    method: "GET",
    path: "/users",
    apiAllowedRole: ["admin", "manager", "user"],
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
            allowedFields: ["id", "username", "email", "name", "createdAt"]
        }
    }
});

export const getAllUsers = Object.freeze({
    method: "GET",
    path: "/users/all",
    apiAllowedRole: ["admin", "manager", "user"],
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
            allowedFields: ["id", "username", "email", "name", "createdAt"]
        }
    }
});

export const createUser = Object.freeze({
    method: "POST",
    path: "/users",
    apiAllowedRole: ["admin", "manager", "user"],
    roles: {
        admin: {
            allowedFields: ["id", "username", "email", "name", "createdAt", "role", "isActive"]
        },
        manager: {
            allowedFields: ["id", "username", "email", "name", "role"]
        },
        user: {
            allowedFields: ["id", "username", "email", "name"]
        },
        guest: {
            allowedFields: []
        }
    }
});