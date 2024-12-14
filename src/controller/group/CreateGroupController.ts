import { Request, Response, NextFunction } from 'express';
import CreateGroupService from '@/service/group/CreateGroupService';
import DatabaseError from "@/utils/DatabaseError";
import { handlePrismaError } from '@/utils/error_handler/prismaErrorHandler';
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
      console.error('Error creating group:', error);

      const prismaError = handlePrismaError(error);
      console.log("prismaError", prismaError)
      if (prismaError) {
        return next(new DatabaseError({ errorType: prismaError.errorType }));
      }

      return next(new AppError('InternalServerError'));
    }
  };
}

export default CreateGroupController;
