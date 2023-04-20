import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInBodySchema = z.object({
    // refine make an custom validation on data
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  // parse throws if the data is invalid and nothing after this line will run
  const { gymId } = createCheckInParamsSchema.parse(request.params);
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

  // getting use case using Factory pattern
  const createCheckInUseCase = makeCheckInUseCase();

  await createCheckInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  reply.status(201).send({
    message: "Check in created successfully",
  });
}
