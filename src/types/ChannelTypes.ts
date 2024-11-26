// ChannelTypes.ts
export type Channel = {
    id: string;
    name: string;
    description: string | null;
}

export type ChannelParticipant = {
    id: string;
    userId: string;
    channelId: string;
    isAdmin: boolean;
}

export type InsertChannelCommandInput = {
    name: string;
    description: string;
    userId: string;
    isAdmin: boolean;
}

export type ChatService = {
    createChannel(input: InsertChannelCommandInput): Promise<Channel>;
    addParticipant(
        userId: string,
        channelId: string,
        isAdmin: boolean
    ): Promise<ChannelParticipant>;
}
