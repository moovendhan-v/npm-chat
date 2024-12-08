const getUsers = Object.freeze({
    method: "GET",
    path: "/users",
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

const getAllUsers = Object.freeze({
    method: "GET",
    path: "/users/all",
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

const createUser = Object.freeze({
    method: "POST",
    path: "/users",
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

// Define your endpoints in a centralized way
export const AuthConfig = Object.freeze({
    endpoints: {
        getUsers,
        createUser,
        getAllUsers
    },
});
