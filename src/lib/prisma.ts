import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  // show the SQL queries in the console if the environment is development
  log: env.NODE_ENV === "dev" ? ["query"] : [],
});
