import fs from 'fs';
import path from 'path';
import {ensureDirectoryExistence} from './CheckDir';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const createService = (serviceName: string): void => {
    const servicePath = path.join(__dirname, '../', 'src', 'service', `${serviceName}Service.ts`);

    const serviceCode = `
  class ${serviceName}Service {
    constructor() {
      // Constructor code, if necessary
    }
  
    async getData(): Promise<string> {
      return 'Data from ${serviceName}Service';
    }
  }
  
  export default new ${serviceName}Service();
    `;

    ensureDirectoryExistence(servicePath);

    fs.writeFileSync(servicePath, serviceCode);
    console.log(`Service ${serviceName} created at ${servicePath}`);
};
