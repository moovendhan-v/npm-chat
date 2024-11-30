import fs from 'fs';
import path from 'path';
import { ensureDirectoryExistence } from './CheckDir';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Function to create the router boilerplate
export const createRouter = (serviceName: string): void => {
    const routerPath = path.join(__dirname, '../', 'src', 'router', `${serviceName}Router.ts`);

    const routerCode = `
  import express from 'express';
  import ${serviceName}Service from '../service/${serviceName}Service';
  
  const router = express.Router();
  
  // Define routes for the ${serviceName} service
  router.get('/data', async (req, res) => {
    try {
      const data = await ${serviceName}Service.getData();
      res.json(data);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  
  export default router;
    `;

    ensureDirectoryExistence(routerPath);

    fs.writeFileSync(routerPath, routerCode);
    console.log(`Router ${serviceName} created at ${routerPath}`);
};