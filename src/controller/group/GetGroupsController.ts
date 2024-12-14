import { NextFunction, Request, Response } from 'express';
import GetGroupsService from '@/service/group/GetGroupsService';
import { handlePrismaError } from '@/utils/error_handler/prismaErrorHandler';
import DatabaseError from '@/utils/DatabaseError';
import AppError from '@/utils/AppError';

class GetGroupssController {
  private service: GetGroupsService = new GetGroupsService();

  getAllGroups = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      const pagination = req.pagination;
      const selectedFields = req.selectedFields || [];
      const select = req.select;

      const options = { pagination, selectedFields, select };
      const users = await this.service.getAllGroupDetails(options);

      res.status(200).json(users);

    } catch (error: any) {
      console.error(error);
      // Handle Prisma-specific errors
      const prismaError = handlePrismaError(error);
      console.log("prismaError", prismaError)
      if (prismaError) {
        return next(new DatabaseError({ errorType: prismaError.errorType }));
      }

      // Pass the error to the error handler middleware
      return next(new AppError('InternalServerError', {
        dynamicMessage: error.message,
      }));
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
      // Handle Prisma-specific errors
      const prismaError = handlePrismaError(error);
      console.log("prismaError", prismaError)
      if (prismaError) {
        return next(new DatabaseError({ errorType: prismaError.errorType }));
      }

      // Pass the error to the error handler middleware
      return next(new AppError('InternalServerError', {
        dynamicMessage: error.message,
      }));
    }
  };

}

export default GetGroupssController;
