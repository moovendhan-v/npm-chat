// import { Express, Request, Response } from "express";
// import swaggerJsdoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
// import { version } from "../../package.json";
// import userRouter from "../router/user/UsersRoute";
// import path from "path";

// const usersRoutePath = path.join(__dirname, './router/user/UsersRoute.ts');
// const usersConfigPath = path.join(__dirname, './validation/user/userValidations.ts');
// console.log("UsersRoute file path::::::", usersRoutePath, usersConfigPath);

// console.log("Absolute paths:",
//     path.resolve(usersRoutePath),
//     path.resolve(usersConfigPath)
// );

// const options: swaggerJsdoc.Options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "REST API Docs",
//             version,
//         },
//         components: {
//             securitySchemes: {
//                 bearerAuth: {
//                     type: "http",
//                     scheme: "bearer",
//                     bearerFormat: "JWT",
//                 },
//             },
//         },
//         security: [
//             {
//                 bearerAuth: [],
//             },
//         ],
//     },
//     apis: [usersRoutePath, usersConfigPath],
// };

// const swaggerSpec = swaggerJsdoc(options);

// function swaggerDocs(app: Express, port: number) {
//     // Swagger page
//     app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//     // Docs in JSON format
//     app.get("/docs.json", (req: Request, res: Response) => {
//         res.setHeader("Content-Type", "application/json");
//         res.send(swaggerSpec);
//     });

//     console.info(`Docs available at http://localhost:${port}/docs`);
// }

// export default swaggerDocs;