import { Router } from 'express';
import GetUsersController from '@/controller/user/GetUsersController';
import CreateUsersController from '@/controller/user/CreateUserController';
import { queryParamMiddleware } from '@/middleware/queryParamsMiddleware';

const userRouter = Router();
const GetUserController = new GetUsersController();
const CreateUserController = new CreateUsersController();

userRouter.get('/all', queryParamMiddleware, GetUserController.getAllUsers);

userRouter.get('/', queryParamMiddleware, GetUserController.getUserDetails);

userRouter.post('/', CreateUserController.createUser);

export default userRouter;
