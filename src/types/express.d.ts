// src/types/express.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      pagination?: {
        skip: number;
        take: number;
      };
      select?: { [key: string]: boolean };
      selectedFields?: string[];
      user?: {
        id: string;
        name: string;
        email: string;
        role: 'admin' | 'manager' | 'user' | 'guest';
      };
    }
  }
}
