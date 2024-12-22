import { Router } from 'express';
import GetUsersController from '@/controller/user/GetUsersController';
import CreateUsersController from '@/controller/user/CreateUserController';
import { queryParamMiddleware } from '@/middleware/queryParamsMiddleware';
import { bodyFieldValidationMiddleware } from "@/middleware/bodyParamsMiddleware";
import { authMiddleware } from '@/middleware/authMiddleware';

const userRouter = Router();
const GetUserController = new GetUsersController();
const CreateUserController = new CreateUsersController();

userRouter.get('/all', authMiddleware, queryParamMiddleware, GetUserController.getAllUsers);

userRouter.get('/', authMiddleware, queryParamMiddleware, GetUserController.getUserDetails);

userRouter.post('/', authMiddleware, bodyFieldValidationMiddleware, CreateUserController.createUser);

export default userRouter;
