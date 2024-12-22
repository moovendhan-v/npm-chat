import GetUsersService from "@/service/user/GetUsersService";
import { UserRole } from "@/types/express";
import AppError from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";

const userService: GetUsersService = new GetUsersService();

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.headers['x-user-id'] as string;
        const apiKey = req.headers['x-api-key'] as string;
        const role = req.headers['x-role'] as UserRole;

        if (!userId || !apiKey) {
            throw new AppError('Unauthorized');
        }

        const isValidApiKey = validateApiKey(apiKey);
        if (!isValidApiKey) {
            throw new AppError('InvalidApiKey');
        }

        const userDetails = await userService.getUserDetails({ id: userId });
        if (!userDetails) {
            throw new AppError('UserNotFound', { dynamicMessage: 'User not found' });
        }
        const [user] = userDetails;

        const userPayload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: role || 'guest',
        };

        console.log("userPayload", userPayload);

        req.user = userPayload;

        next();
    } catch (error) {
        console.error("Error in authMiddleware:", error);
        next(error);
    }
};

const validateApiKey = (apiKey: string): boolean => {
    const validApiKey = process.env.VALID_API_KEY;

    // TODO: Later we need to implement this logic to validate the API key from the database
    // Check if the valid API key is defined in the environment

    if (!validApiKey) {
        throw new AppError('InvalidApiKey');
    }

    if (apiKey !== validApiKey) {
        throw new AppError('InvalidApiKey');
    }

    return true;
};

export { authMiddleware };