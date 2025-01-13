import { Request, Response, NextFunction } from 'express';
import PrivateChatService from '@/service/message/PrivateChatService';

interface CreateChatRequest {
    senderId: string;
    receiverId: string;
}

interface SendMessageRequest {
    chatId: string;
    senderId: string;
    content: string;
}

class OneOnOneChatController {
    private service: PrivateChatService = new PrivateChatService();

    createChat = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body: CreateChatRequest = req.body;
            console.log('Creating chat with payload:', body);
            const chat = await this.service.createOneOnOneChat(body);
            return res.status(201).json(chat);
        } catch (error: any) {
            next(error);
        }
    };

    sendMessage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body: SendMessageRequest = req.body;
            console.log('Sending message with payload:', body);
            const message = await this.service.sendMessage(body);
            return res.status(201).json(message);
        } catch (error: any) {
            next(error);
        }
    };

    getChatMessages = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { chatId } = req.params;
            console.log('Fetching messages for chat:', chatId);
            const messages = await this.service.getChatMessages(chatId);
            return res.status(200).json(messages);
        } catch (error: any) {
            next(error);
        }
    };

    getUserChats = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.params;
            console.log('Fetching chats for user:', userId);
            const chats = await this.service.getUserChats(userId);
            return res.status(200).json(chats);
        } catch (error: any) {
            next(error);
        }
    };
}

export default OneOnOneChatController;