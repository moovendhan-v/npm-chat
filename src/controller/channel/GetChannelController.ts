import { NextFunction, Request, Response } from 'express';
import GetChannelService from '@/service/channel/GetChannelService';
import AppError from '@/utils/AppError';

class GetChannelController{
  private service: GetChannelService = new GetChannelService();

  getAllChennels = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      if (!req.options) throw new AppError('PayloadValidationFailed');

      const users = await this.service.getAllChannelDetails(req.options);

      res.status(200).json(users);

    } catch (error: any) {
      next(error);
    }
  };

  getGroupDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.query;

      const users = await this.service.getChannelDetails({
        id: id as string
      });

      res.status(200).json(users);
    } catch (error: any) {
      next(error)
    }
  };

}

export default GetChannelController;
