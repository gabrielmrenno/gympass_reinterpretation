import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { ZodError, z } from "zod";
import { appRoutes } from "./http/routes";
import { env } from "./env";

// Create a Fastify server
export const app = fastify();

// register jwt to server
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

// register the routes' plugin
app.register(appRoutes);

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
