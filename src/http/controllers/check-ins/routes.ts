import { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";
import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";
import { metrics } from "./metrics";

// adding a plugin of routes
export async function checkInsRoutes(app: FastifyInstance) {
  // attaching middleware on requests in this file
  app.addHook("onRequest", verifyJWT);

  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.post("/gyms/:gymId/check-in", create);
  app.patch("/check-ins/:checkInId", validate);
}
