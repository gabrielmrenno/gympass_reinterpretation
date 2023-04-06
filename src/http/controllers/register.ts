import { FastifyRequest, FastifyReply } from "fastify";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  // parse throws if the data is invalid and nothing after this line will run
  const { name, email, password } = registerBodySchema.parse(request.body);

  // creating a new instance of the repository and injecting into use case
  const usersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  try {
    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    return reply.status(400).send();
  }

  reply.status(201).send({
    message: "User created successfully",
  });
}
