import { NextFunction, Request, Response } from 'express';
import GetGroupsService from '@/service/group/GetGroupsService';
import AppError from '@/utils/AppError';

class GetGroupssController {
  private service: GetGroupsService = new GetGroupsService();

  getAllGroups = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      if (!req.options) throw new AppError('PayloadValidationFailed');

      const users = await this.service.getAllGroupDetails(req.options);

      res.status(200).json(users);

    } catch (error: any) {
      next(error);
    }
  };

  getGroupDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id, name } = req.query;

      const users = await this.service.getGroupsDetails({
        id: id as string,
        name: name as string,
      });

      res.status(200).json(users);
    } catch (error: any) {
      next(error)
    }
  };

}

export default GetGroupssController;
