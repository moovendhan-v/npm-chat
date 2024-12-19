import { Router } from 'express';
import CreateChannelController from '@/controller/channel/CreateChannelController';
import GetChannelController from '@/controller/channel/GetChannelController';
import { bodyFieldValidationMiddleware } from "@/middleware/bodyParamsMiddleware";
import { queryParamMiddleware } from '@/middleware/queryParamsMiddleware';

const channelRouter = Router();
const channel = new CreateChannelController();
const getChannel = new GetChannelController();

channelRouter.post('/', bodyFieldValidationMiddleware, channel.createChannel);

channelRouter.get('/all', queryParamMiddleware, getChannel.getAllChennels);

channelRouter.get('/', queryParamMiddleware, getChannel.getGroupDetails);

export default channelRouter;