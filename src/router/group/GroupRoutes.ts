import { Router } from 'express';
import CreateGroupController from '@/controller/group/CreateGroupController';

const groupRouter = Router();
const CreateGroup = new CreateGroupController();

groupRouter.post('/', CreateGroup.createGroup);

export default groupRouter;