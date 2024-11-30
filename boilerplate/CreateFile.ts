import { createService } from './Service';
import { createController } from './Controller';
import { createRouter } from './Router';

const handleArguments = (): void => {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.error('Please provide a name for the service/controller (e.g., npm run create User)');
    process.exit(1);
  }

  const serviceName = args[0];
  createService(serviceName);
  createController(serviceName);
  createRouter(serviceName);
};

handleArguments();
