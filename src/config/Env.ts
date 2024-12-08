import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGO_CONNECTION_STRING: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string().default("465"),
  SMTP_USERNAME: z.string(),
  SMTP_PASSWORD: z.string(),
  SMTP_FROM_EMAIL: z.string()
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('Invalid environment variables:', env.error.format());
  process.exit(1); // Terminate the application if validation fails
}

export const Env = env.data;
// console.log(Env);