import { Request, Response, NextFunction } from "express";
import { AuthConfig } from "@/validation/config";
import AppError from "@/utils/AppError";

// Type definition for the allowed fields
type AllowedFields = string[];

const queryParamMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Default options for pagination
        const skip = parseInt(req.query.skip as string, 10) || 0;
        const take = parseInt(req.query.take as string, 10) || 10;

        const path = req.originalUrl.split('?')[0];

        // Safely get the user role
        const userRole = req.user?.role || 'guest';

        console.debug(`Request received - Method: ${req.method}, Path: ${path}, Query Params: ${JSON.stringify(req.query)}, IP: ${req.ip}, Role: ${userRole}`);

        // Determine which endpoint the request is for
        const endpoint = Object.keys(AuthConfig.endpoints).find((key) => {
            const endpoint = AuthConfig.endpoints[key as keyof typeof AuthConfig.endpoints];
            return path === endpoint.path && endpoint.method === req.method;
        });

        if (!endpoint) throw new AppError('InvalidEndpoint');

        // Extract endpoint config and assert that it's a valid key
        const endpointConfig = AuthConfig.endpoints[endpoint as keyof typeof AuthConfig.endpoints];

        if (!endpointConfig.apiAllowedRole.includes(userRole)) throw new AppError('Unauthorized');

        // Assert that userRole is a valid role
        const allowedFields: AllowedFields = endpointConfig.roles[userRole as keyof typeof endpointConfig.roles]?.allowedFields || [];

        if (allowedFields.length === 0) throw new AppError('invalidFieldsException');

        // Parse 'fields' query param if exists
        let fields: string[] = [];
        if (req.query.fields) {
            fields = (req.query.fields as string).split(',').filter((field) => allowedFields.includes(field));
        }

        // Set the final pagination and field selection options on the request object
        req.pagination = { skip, take };
        req.selectedFields = fields.length > 0 ? fields : allowedFields;
        req.options = {
            pagination: req.pagination,
            selectedFields: req.selectedFields || "",
            select: req.select || {}
        }

        // Convert selected fields to Prisma's 'select' format
        const select = req.selectedFields.reduce((acc: { [key: string]: boolean }, field) => {
            acc[field] = true;
            return acc;
        }, {});

        req.select = select;

        next();
    } catch (error) {
        next(error);
    }
};

export { queryParamMiddleware };
