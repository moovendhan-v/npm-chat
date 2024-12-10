import { Request, Response, NextFunction } from "express";
import { AuthConfig } from "@/config/auth/config";

const bodyFieldValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const path = req.originalUrl.split('?')[0];
    const userRole = req.user?.role || 'guest';
    
    console.debug(`Request received - Method: ${req.method}, Path: ${path}, Body: ${JSON.stringify(req.body)}, Role: ${userRole}`);

    // Find the matching endpoint
    const endpoint = Object.keys(AuthConfig.endpoints).find((key) =>
        path.includes(AuthConfig.endpoints[key as keyof typeof AuthConfig.endpoints].path)
    );


    console.log(endpoint);

    if (!endpoint) {
        return res.status(400).json({ error: "Invalid endpoint" });
    }

    // Get endpoint configuration
    const endpointConfig = AuthConfig.endpoints[endpoint as keyof typeof AuthConfig.endpoints];
    
    console.log(endpointConfig)

    // Get allowed fields for the current user role
    const allowedFields = endpointConfig.roles[userRole as keyof typeof endpointConfig.roles]?.allowedFields ?? [];

    console.log("allowedFields", allowedFields)

    if (allowedFields.length === 0) {
        return res.status(403).json({ error: "No fields available for this role" });
    }

    if (req.method === 'POST' || req.method === 'PUT') {
        // Explicit type definition for request body
        const requestBody = req.body as Record<string, unknown>;

        // Type-safe invalid fields check
        const invalidFields: string[] = Object.keys(requestBody).reduce<string[]>((acc: string[], key: string) => {
            if (!allowedFields.includes(key)) {
                acc.push(key);
            }
            return acc;
        }, []);

        if (invalidFields.length > 0) {
            return res.status(400).json({
                error: `The following fields are not allowed for this role: ${invalidFields.join(', ')}`
            });
        }

        // Create a new object with only allowed fields
        const sanitizedBody: Record<string, unknown> = {};
        
        // Explicitly copy only allowed fields
        allowedFields.forEach((field) => {
            if (Object.prototype.hasOwnProperty.call(requestBody, field)) {
                sanitizedBody[field] = requestBody[field];
            }
        });

        if (Object.keys(sanitizedBody).length === 0) {
            return res.status(400).json({ error: "No valid fields provided for this role." });
        }

        // Replace request body with sanitized body
        req.body = sanitizedBody;
        
        console.log("Sanitized Body:", req.body);
    }

    next();
};

export { bodyFieldValidationMiddleware };