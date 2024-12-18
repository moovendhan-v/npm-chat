import { Router } from 'express';
import CreateChannelController from '@/controller/channel/CreateChannelController';
import { bodyFieldValidationMiddleware } from "@/middleware/bodyParamsMiddleware";

const channelRouter = Router();
const channel = new CreateChannelController();

channelRouter.post('/', bodyFieldValidationMiddleware, channel.createChannel);

export default channelRouter;