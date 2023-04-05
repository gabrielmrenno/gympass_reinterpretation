import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";

// adding a plugin of routes
export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
}
