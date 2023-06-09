import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { ZodError, z } from "zod";
import { usersRoutes } from "./http/controllers/users/routes";
import { env } from "./env";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { checkInsRoutes } from "./http/controllers/check-ins/routes";

// comment to test github actions

// Create a Fastify server
export const app = fastify();

// register jwt to server
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    // this info is not signed (hashed)
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

// register the routes' plugin
app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

// creating a global error handler
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: log error to a service like Sentry, Datadog, etc
  }

  return reply.status(500).send({
    message: "Internal server error",
  });
});
