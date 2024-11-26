import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGO_CONNETION_STRING: z.string()
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('Invalid environment variables:', env.error.format());
  process.exit(1); // Terminate the application if validation fails
}

export const Env = env.data;
console.log(Env)