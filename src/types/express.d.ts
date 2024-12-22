// src/types/express.d.ts
import { Request } from "express";

// Define reusable types
interface Pagination {
  skip: number;
  take: number;
}

interface Select {
  [key: string]: boolean;
}

type UserRole = "admin" | "manager" | "user" | "guest";

export type RequestOptions = {
  pagination: Pagination;
  select: Select;
  selectedFields: string[];
}

declare global {
  namespace Express {
    interface Request {
      pagination?: Pagination;
      select?: Select;
      selectedFields?: string[];
      options?: RequestOptions;
      user?: {
        id: string;
        username: string;
        email: string;
        role: UserRole;
      };
    }
  }
}