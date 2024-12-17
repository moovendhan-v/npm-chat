import { Request, Response, NextFunction } from 'express';
import CreateUserService from '@/service/user/CreateUserService';
import { CreateUserInput } from "@/types/CreateUser";

class CreateUsersController {
    private service: CreateUserService = new CreateUserService();

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body: CreateUserInput = req.body;
            console.log('body', body);

            const users = await this.service.createUser(body);
            return res.status(200).json(users);

        } catch (error: any) {
            next(error);
        }
    };
}

export default CreateUsersController;
