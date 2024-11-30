import fs from 'fs';
import path from 'path';
import { ensureDirectoryExistence } from './CheckDir';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const createController = (controllerName: string): void => {
    const controllerPath = path.join(__dirname, '../', 'src', 'controller', `${controllerName}Controller.ts`);

    const controllerCode = `
  import ${controllerName}Service from '../service/${controllerName}Service';
  
  class ${controllerName}Controller {
    async getData(req: any, res: any): Promise<void> {
      try {
        const data = await ${controllerName}Service.getData();
        res.json(data);
      } catch (error) {
        res.status(500).send('Server error');
      }
    }
  }
  
  export default new ${controllerName}Controller();
    `;

    ensureDirectoryExistence(controllerPath);

    fs.writeFileSync(controllerPath, controllerCode);
    console.log(`Controller ${controllerName} created at ${controllerPath}`);
};