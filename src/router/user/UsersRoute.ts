import { Router } from 'express';
import GetUsersController from '@/controller/user/GetUsersController';
import { queryParamMiddleware } from '@/middleware/queryParamsMiddleware';

const userRouter = Router();
const userController = new GetUsersController();

userRouter.get('/all', queryParamMiddleware, userController.getAllUsers);

userRouter.get('/', queryParamMiddleware, userController.getUserDetails);

export default userRouter;
