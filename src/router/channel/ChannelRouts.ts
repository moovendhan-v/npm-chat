import CreateChannelController from '@/controller/channel/CreateChannelController';
import GetChannelController from '@/controller/channel/GetChannelController';
import { bodyFieldValidationMiddleware } from "@/middleware/bodyParamsMiddleware";
import { queryParamMiddleware } from '@/middleware/queryParamsMiddleware';
import { authMiddleware } from '@/middleware/authMiddleware';
import { Router } from 'express';

const channelRouter = Router();
const channel = new CreateChannelController();
const getChannel = new GetChannelController();

channelRouter.post('/', authMiddleware, bodyFieldValidationMiddleware, channel.createChannel);

channelRouter.get('/all', authMiddleware, queryParamMiddleware, getChannel.getAllChennels);

channelRouter.get('/', authMiddleware, queryParamMiddleware, getChannel.getGroupDetails);

export default channelRouter;