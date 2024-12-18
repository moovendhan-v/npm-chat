import { Request, Response, NextFunction } from 'express';
import CreateChannelService from '@/service/channel/CreateChannelService';

class CreateChannelController {
  private service: CreateChannelService = new CreateChannelService();

  public createChannel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, description, userId, isAdmin = false } = req.body;

      const channel = await this.service.createChannel({
        name,
        description,
        userId,
        isAdmin
      });

      res.status(201).json({ message: 'Channel created successfully.', channel });
    } catch (error) {
      next(error);
    }
  };
}

export default CreateChannelController;
