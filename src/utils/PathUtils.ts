import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Define and set global __dirname
globalThis.__filename = fileURLToPath(import.meta.url);
globalThis.__dirname = dirname(globalThis.__filename);
