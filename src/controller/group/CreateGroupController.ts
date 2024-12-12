import { Request, Response } from 'express';
import CreateGroupService from '@/service/group/CreateGroupService';
import { throwDatabaseError } from "@/utils/DatabaseError";

class CreateGroupController {
  private service: CreateGroupService = new CreateGroupService();

  public createGroup = async (req: Request, res: Response) => {
    try {
      const { name, admins, members } = req.body;

      console.log("req.body", req.body)
      // TODO: Hanle this validations using zod
      if (!name || typeof name !== 'string') {
        res.status(400).json({ error: 'Group name is required and must be a string.' });
        return;
      }

      if (admins && !Array.isArray(admins)) {
        res.status(400).json({ error: 'Admins must be an array of user IDs.' });
        return;
      }

      if (members && !Array.isArray(members)) {
        res.status(400).json({ error: 'Members must be an array of user IDs.' });
        return;
      }

      const group = await this.service.createGroup({
        name,
        admins: admins?.map((id: string) => ({ userId: id })),
        members: members?.map((id: string) => ({ userId: id })),
      });

      res.status(201).json({ message: 'Group created successfully.', group });
    } catch (error) {
      console.error('Error creating group:', error);
      throwDatabaseError(error);
    }
  };
}

export default CreateGroupController;
