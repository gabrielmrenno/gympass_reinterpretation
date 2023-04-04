import "dotenv/config"; // load .env file as process.env: { ... }

import { z } from "zod";

// validate env variables with zod
const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "production", "test"]).default("dev"),
  // coerce: try to convert data to the specified type (number)
  PORT: z.coerce.number().default(3333),
});

// safeParse: try ti validate the object
const _env = envSchema.safeParse(process.env);

// if the validation fails, show an error
if (!_env.success) {
  // .format() returns an array of errors that is easier to read
  console.error("Invalid env variables: ", _env.error.format());

  // end the process
  throw new Error("Invalid env variables");
}

// export the validated env variables
export const env = _env.data;
