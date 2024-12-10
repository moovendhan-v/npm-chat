import { Router } from 'express';
import CreateGroupController from '@/controller/group/CreateGroupController';
import { bodyFieldValidationMiddleware } from "@/middleware/bodyParamsMiddleware";

const groupRouter = Router();
const CreateGroup = new CreateGroupController();

groupRouter.post('/', bodyFieldValidationMiddleware, CreateGroup.createGroup);

export default groupRouter;