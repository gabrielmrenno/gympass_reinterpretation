import fastify from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";

// Create a Fastify server
export const app = fastify();

app.post("/users", async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  // parse throws if the data is invalid and nothing after this line will run
  const { name, email, password } = registerBodySchema.parse(request.body);

  // create a new user
  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  });

  reply.status(201).send({
    message: "User created successfully",
  });
});
