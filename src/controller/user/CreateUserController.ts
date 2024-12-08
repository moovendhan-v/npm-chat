import { Request, Response } from 'express';
import CreateUserService from '@/service/user/CreateUserService';
import { CreateUserInput } from "@/types/CreateUser";

class CreateUsersController {
    private service: CreateUserService = new CreateUserService();

    createUser = async (req: Request, res: Response): Promise<void> => {
        try {

            const body: CreateUserInput = req.body;
            console.log('body', body)
            const users = await this.service.createUser(body);

            res.status(200).json(users);

        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    };
}

export default CreateUsersController;
