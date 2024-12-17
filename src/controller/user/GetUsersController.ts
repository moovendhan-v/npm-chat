import { NextFunction, Request, Response } from 'express';
import GetUsersService from '@/service/user/GetUsersService';
import AppError from '@/utils/AppError';

class GetUsersController {
  private service: GetUsersService = new GetUsersService();

  getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      if (!req.options) throw new AppError('PayloadValidationFailed');

      const users = await this.service.getAllUsers(req.options);

      res.status(200).json(users);

    } catch (error: any) {
      next(error)
    }
  };

  getUserDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id, name } = req.query;

      const users = await this.service.getUserDetails({
        id: id as string,
        name: name as string,
      });

      res.status(200).json(users);
    } catch (error: any) {
      next(error);
    }
  };

}

export default GetUsersController;
