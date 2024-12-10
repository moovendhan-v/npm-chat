export const createGroups = Object.freeze({
    method: "POST",
    path: "/groups",
    roles: {
        admin: {
            aallowedFields: ["id", "admins", "name", "members"]
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