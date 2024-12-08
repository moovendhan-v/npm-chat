import { Request, Response, NextFunction } from "express";
import { AuthConfig } from "@/config/auth/config";

// Type definition for the allowed fields
type AllowedFields = string[];

const queryParamMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Default options for pagination
    const skip = parseInt(req.query.skip as string, 10) || 0;
    const take = parseInt(req.query.take as string, 10) || 10;

    const path = req.originalUrl.split('?')[0];
    
    // Safely get the user role
    const userRole = req.user?.role || 'guest';

    console.debug(`Request received - Method: ${req.method}, Path: ${path}, Query Params: ${JSON.stringify(req.query)}, IP: ${req.ip}, Role: ${userRole}`);

    // Determine which endpoint the request is for
    const endpoint = Object.keys(AuthConfig.endpoints).find((key) => path.includes(AuthConfig.endpoints[key as keyof typeof AuthConfig.endpoints].path));

    console.log("endpoint", endpoint);

    if (!endpoint) {
        return res.status(400).json({ error: "Invalid endpoint" });
    }

    // Extract endpoint config and assert that it's a valid key
    const endpointConfig = AuthConfig.endpoints[endpoint as keyof typeof AuthConfig.endpoints];


    // Assert that userRole is a valid role
    const allowedFields: AllowedFields = endpointConfig.roles[userRole as keyof typeof endpointConfig.roles]?.allowedFields || [];

    if (allowedFields.length === 0) {
        return res.status(403).json({ error: "No fields available for this role" });
    }

    // Parse 'fields' query param if exists
    let fields: string[] = [];
    if (req.query.fields) {
        fields = (req.query.fields as string).split(',').filter((field) => allowedFields.includes(field));
    }

    // Set the final pagination and field selection options on the request object
    req.pagination = { skip, take };
    req.selectedFields = fields.length > 0 ? fields : allowedFields;

    console.log("selectedFields", req.selectedFields);

    // Convert selected fields to Prisma's 'select' format
    const select = req.selectedFields.reduce((acc: { [key: string]: boolean }, field) => {
        acc[field] = true;
        return acc;
    }, {});

    req.select = select;

    console.log("select", select);

    next();
}

export { queryParamMiddleware };
