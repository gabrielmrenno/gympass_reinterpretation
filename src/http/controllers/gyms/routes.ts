import { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "../../middlewares/verify-user-role";

import { search } from "./search";
import { nearby } from "./nearby";
import { create } from "./create";

// adding a plugin of routes
export async function gymsRoutes(app: FastifyInstance) {
  // attaching middleware on requests in this file
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearby);

  app.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, create);
}
