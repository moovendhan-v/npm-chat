import { Router } from 'express';
import CreateGroupController from '@/controller/group/CreateGroupController';
import { bodyFieldValidationMiddleware } from "@/middleware/bodyParamsMiddleware";
import GetGroupssController from '@/controller/group/GetGroupsController';
import { queryParamMiddleware } from '@/middleware/queryParamsMiddleware';
import { authMiddleware } from '@/middleware/authMiddleware';

const groupRouter = Router();
const CreateGroup = new CreateGroupController();
const GerGroups = new GetGroupssController();

groupRouter.post('/', authMiddleware, bodyFieldValidationMiddleware, CreateGroup.createGroup);

groupRouter.get('/all', authMiddleware, queryParamMiddleware, GerGroups.getAllGroups);

groupRouter.get('/', authMiddleware, queryParamMiddleware, GerGroups.getGroupDetails);

export default groupRouter;