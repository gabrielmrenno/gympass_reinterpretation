import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  // parse throws if the data is invalid and nothing after this line will run
  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  // getting use case using Factory pattern
  const validateCheckInUseCase = makeValidateCheckInUseCase();

  await validateCheckInUseCase.execute({
    checkInId,
  });

  reply.status(204).send();
}
