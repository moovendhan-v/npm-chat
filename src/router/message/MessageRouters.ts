import { Router } from 'express';
import OneOnOneChatController from '@/controller/message/PrivateChatController';
import { bodyFieldValidationMiddleware } from "@/middleware/bodyParamsMiddleware";
import { queryParamMiddleware } from '@/middleware/queryParamsMiddleware';
import { authMiddleware } from '@/middleware/authMiddleware';

const messageRouter = Router();
const chatController = new OneOnOneChatController();

messageRouter.post('/private', authMiddleware, bodyFieldValidationMiddleware, chatController.createChat);

messageRouter.post('/private/:chatId/messages', authMiddleware, bodyFieldValidationMiddleware, chatController.sendMessage);

messageRouter.get('/private/:chatId/messages', authMiddleware, queryParamMiddleware, chatController.getChatMessages);

messageRouter.post('/private/user/:userId', authMiddleware, queryParamMiddleware, chatController.getUserChats);

export default messageRouter;