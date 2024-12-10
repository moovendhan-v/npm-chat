import { Request, Response } from 'express';
import CreateUserService from '@/service/user/CreateUserService';
import { CreateUserInput } from "@/types/CreateUser";
import { handlePrismaError } from "@/utils/error_handler/prismaErrorHandler";

class CreateUsersController {
    private service: CreateUserService = new CreateUserService();

    createUser = async (req: Request, res: Response) => {
        try {

            const body: CreateUserInput = req.body;
            console.log('body', body)
            const users = await this.service.createUser(body);

            return res.status(200).json(users);

        } catch (error: any) {
            console.error(error);

            const prismaError = handlePrismaError(error);
            if (prismaError) {
                return res.status(prismaError.statusCode).json(prismaError);
            }

            res.status(500).json({ error: "Internal server error" });
        }
    };
}

export default CreateUsersController;
