
// // Unit tests for: queryParamMiddleware


// import AppError from "@/utils/AppError";
// import { NextFunction, Request, Response } from "express";
// import { queryParamMiddleware } from '../../middleware/queryParamsMiddleware';




// jest.mock("@/validation/config", () => ({
//   AuthConfig: {
//     endpoints: {
//       "/api/test": {
//         path: "/api/test",
//         method: "GET",
//         apiAllowedRole: ["admin", "user"],
//         roles: {
//           admin: { allowedFields: ["name", "email", "role"] },
//           user: { allowedFields: ["name", "email"] },
//           guest: { allowedFields: [] }
//         }
//       }
//     }
//   }
// }));

// describe('queryParamMiddleware() queryParamMiddleware method', () => {
//   let req: Partial<Request>;
//   let res: Partial<Response>;
//   let next: NextFunction;

//   beforeEach(() => {
//     req = {
//       query: {},
//       originalUrl: "/api/test",
//       route: { path: "/api/test" },
//       baseUrl: "",
//       method: "GET",
//       user: { role: "user" }
//     };
//     res = {};
//     next = jest.fn();
//   });

//   describe("Happy paths", () => {
//     it("should set default pagination and allowed fields for a valid user role", async () => {
//       // Test to ensure default pagination and allowed fields are set correctly
//       await queryParamMiddleware(req as Request, res as Response, next);

//       expect(req.pagination).toEqual({ skip: 0, take: 10 });
//       expect(req.selectedFields).toEqual(["name", "email"]);
//       expect(req.select).toEqual({ name: true, email: true });
//       expect(next).toHaveBeenCalledWith();
//     });

//     it("should parse and set fields from query if they are allowed", async () => {
//       // Test to ensure fields from query are parsed and set correctly
//       req.query.fields = "name,role";

//       await queryParamMiddleware(req as Request, res as Response, next);

//       expect(req.selectedFields).toEqual(["name"]);
//       expect(req.select).toEqual({ name: true });
//       expect(next).toHaveBeenCalledWith();
//     });
//   });

//   describe("Edge cases", () => {
//     it("should handle invalid endpoint gracefully", async () => {
//       // Test to ensure invalid endpoint is handled
//       req.originalUrl = "/api/invalid";
//       req.route.path = "/api/invalid";

//       await queryParamMiddleware(req as Request, res as Response, next);

//       expect(next).toHaveBeenCalledWith(expect.any(AppError));
//       expect(next).toHaveBeenCalledWith(expect.objectContaining({ message: "InvalidEndpoint" }));
//     });

//     it("should handle unauthorized user role", async () => {
//       // Test to ensure unauthorized user role is handled
//       req.user.role = "guest";

//       await queryParamMiddleware(req as Request, res as Response, next);

//       expect(next).toHaveBeenCalledWith(expect.any(AppError));
//       expect(next).toHaveBeenCalledWith(expect.objectContaining({ message: "Unauthorized" }));
//     });

//     it("should handle invalid fields exception", async () => {
//       // Test to ensure invalid fields exception is handled
//       req.user.role = "guest";

//       await queryParamMiddleware(req as Request, res as Response, next);

//       expect(next).toHaveBeenCalledWith(expect.any(AppError));
//       expect(next).toHaveBeenCalledWith(expect.objectContaining({ message: "invalidFieldsException" }));
//     });

//     it("should handle non-numeric skip and take query params", async () => {
//       // Test to ensure non-numeric skip and take are handled
//       req.query.skip = "abc";
//       req.query.take = "xyz";

//       await queryParamMiddleware(req as Request, res as Response, next);

//       expect(req.pagination).toEqual({ skip: 0, take: 10 });
//       expect(next).toHaveBeenCalledWith();
//     });
//   });
// });

// // End of unit tests for: queryParamMiddleware
