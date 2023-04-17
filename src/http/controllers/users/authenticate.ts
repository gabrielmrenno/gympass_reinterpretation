import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  // getting authenticateUseCase by Factory pattern
  const authenticateUseCase = makeAuthenticateUseCase();

  try {
    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    // setting token from JWT, setting sub as user id
    const token = await reply.jwtSign(
      // payload: additional info in token
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    reply.status(200).send({
      token,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
