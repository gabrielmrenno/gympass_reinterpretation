import fastify from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import { register } from "./http/controllers/register";
import { appRoutes } from "./http/routes";

// Create a Fastify server
export const app = fastify();

// register the routes' plugin
app.register(appRoutes);
