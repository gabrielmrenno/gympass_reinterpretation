import { FastifyInstance } from "fastify";

import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJWT } from "../../middlewares/verify-jwt";

// adding a plugin of routes
export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  // Authenticated with auth middleware
  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
