import { Router } from 'express';
import CreateGroupController from '@/controller/group/CreateGroupController';
import { bodyFieldValidationMiddleware } from "@/middleware/bodyParamsMiddleware";
import GetGroupssController from '@/controller/group/GetGroupsController';
import { queryParamMiddleware } from '@/middleware/queryParamsMiddleware';

const groupRouter = Router();
const CreateGroup = new CreateGroupController();
const GerGroups = new GetGroupssController();

groupRouter.post('/', bodyFieldValidationMiddleware, CreateGroup.createGroup);

groupRouter.get('/all', queryParamMiddleware, GerGroups.getAllGroups);

groupRouter.get('/', queryParamMiddleware, GerGroups.getGroupDetails);

export default groupRouter;