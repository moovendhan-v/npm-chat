import { Router } from 'express';
import GetUsersController from '@/controller/user/GetUsersController';
import CreateUsersController from '@/controller/user/CreateUserController';
import { queryParamMiddleware } from '@/middleware/queryParamsMiddleware';
import { bodyFieldValidationMiddleware } from "@/middleware/bodyParamsMiddleware";
import { authMiddleware } from '@/middleware/authMiddleware';
import path from 'path';

const userRouter = Router();
const GetUserController = new GetUsersController();
const CreateUserController = new CreateUsersController();

/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of all users.
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
userRouter.get('/all', authMiddleware, queryParamMiddleware, GetUserController.getAllUsers);

userRouter.get('/', authMiddleware, queryParamMiddleware, GetUserController.getUserDetails);

userRouter.post('/', authMiddleware, bodyFieldValidationMiddleware, CreateUserController.createUser);

export default userRouter;
