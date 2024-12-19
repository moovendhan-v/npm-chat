import { getUsers, getAllUsers, createUser } from "@/validation/user/user.config";
import { createGroups, getGroups, getAllGroups } from "@/validation/groups/group.config";
import { createChannels, getAllChannels, getChannels } from "@/validation/channels/channels.config";

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
