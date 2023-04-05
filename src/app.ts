import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

// Create a Fastify server
export const app = fastify();

// create an instance of PrismaClient to access the database
const prisma = new PrismaClient();

prisma.user.create({
  data: {
    name: "Test Name",
    email: "teste@email.com",
  },
});
