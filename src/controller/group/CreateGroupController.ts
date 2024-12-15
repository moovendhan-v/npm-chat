import { Request, Response, NextFunction } from 'express';
import CreateGroupService from '@/service/group/CreateGroupService';
import AppError from '@/utils/AppError';

class CreateGroupController {
  private service: CreateGroupService = new CreateGroupService();

  public createGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, admins, members } = req.body;

      console.log("req.body", req.body)

      const group = await this.service.createGroup({
        name,
        admins: admins?.map((id: string) => ({ userId: id })),
        members: members?.map((id: string) => ({ userId: id })),
      });

      res.status(201).json({ message: 'Group created successfully.', group });
    } catch (error) {
      next(error);
      return next(new AppError('InternalServerError'));
    }
  };
}

export default CreateGroupController;
