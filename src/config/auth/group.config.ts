export const createGroups = Object.freeze({
    method: "POST",
    path: "/groups",
    apiAllowedRole: ["admin", "manager", "user"],
    validateSchema: undefined,
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
            allowedFields: ["id", "admins", "name", "members"]
        }
    }
});