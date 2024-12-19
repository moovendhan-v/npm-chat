import { getUsers, getAllUsers, createUser } from "@/config/auth/user.config";
import { createGroups, getGroups, getAllGroups } from "@/config/auth/group.config";
import { createChannels, getAllChannels, getChannels } from "@/config/auth/channels.config";

// Define your endpoints in a centralized way
export const AuthConfig = Object.freeze({
    endpoints: {
        getUsers,
        createUser,
        createGroups,
        getAllUsers,
        getGroups,
        getAllGroups,
        createChannels,
        getChannels,
        getAllChannels
    },
});
