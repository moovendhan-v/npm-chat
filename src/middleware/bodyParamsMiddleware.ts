import { Request, Response, NextFunction } from "express";
import { AuthConfig } from "@/config/auth/config";
import AppError from "@/utils/AppError";

const bodyFieldValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const path = req.originalUrl.split('?')[0];
    const userRole = req.user?.role || 'guest';

    console.debug(`Request received - Method: ${req.method}, Path: ${path}, Role: ${userRole}`);

    // Find the matching endpoint based on the path
    const endpointKey = Object.keys(AuthConfig.endpoints).find((key) =>
        path.includes(AuthConfig.endpoints[key as keyof typeof AuthConfig.endpoints].path)
    );

    if (!endpointKey) {
        // Invalid endpoint error
        throw new AppError("InvalidEndpoint");
    }

    const endpointConfig = AuthConfig.endpoints[endpointKey as keyof typeof AuthConfig.endpoints];

    // Verify if the user's role is allowed for the endpoint
    if (!endpointConfig.apiAllowedRole.includes(userRole)) {
        // User role not allowed error with dynamic message
        throw new AppError("UserRoleNotAllowed", {
            dynamicMessage: `User role {role} is not allowed to access {path}`
        });
    }

    const allowedFields: string[] = endpointConfig.roles[userRole as keyof typeof endpointConfig.roles]?.allowedFields || [];

    if (allowedFields.length === 0) {
        // Role field restriction error with dynamic message
        throw new AppError("RoleFieldRestriction", {
            dynamicMessage: `User role '${userRole}' has no allowed fields for '${path}'.`
        });
    }

    if (req.method === 'POST' || req.method === 'PUT') {
        const requestBody = req.body as Record<string, unknown>;

        // Identify invalid fields in the request body
        const invalidFields = Object.keys(requestBody).filter(key => !allowedFields.includes(key));

        if (invalidFields.length > 0) {
            // Invalid fields error with dynamic message
            throw new AppError("invalidFieldsException", {
                dynamicMessage: `The following fields are not allowed: ${invalidFields.join(', ')}`
            });
        }

        // Create a sanitized body containing only allowed fields
        const sanitizedBody = Object.fromEntries(
            // TODO: Add the input validations using the zod
            Object.entries(requestBody).filter(([key]) => allowedFields.includes(key))
        );

        if (Object.keys(sanitizedBody).length === 0) {
            throw new AppError("invalidFieldsException", {
                dynamicMessage: `Request body does not contain any valid fields for this role.`
            });
        }

        // Replace request body with the sanitized version
        req.body = sanitizedBody;
        console.debug("Sanitized Body:", req.body);
    }

    next();
};

export { bodyFieldValidationMiddleware };
