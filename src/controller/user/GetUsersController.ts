import { Request, Response } from 'express';
import GetUsersService from '@/service/user/GetUsersService';

class GetUsersController {
  private service: GetUsersService = new GetUsersService();

  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {

      const pagination = req.pagination;
      const selectedFields = req.selectedFields || [];
      const select = req.select;

      const options = { pagination, selectedFields, select };
      const users = await this.service.getAllUsers(options);

      res.status(200).json(users);

    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getUserDetails = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id, name } = req.query;

      const users = await this.service.getUserDetails({
        id: id as string,
        name: name as string,
      });

      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default GetUsersController;
