import {groupCreationSchema} from "@/validation/groups/groupsValidations"

export const createGroups = Object.freeze({
    method: "POST",
    path: "/groups",
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