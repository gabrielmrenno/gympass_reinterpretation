import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    // refine make an custom validation on data
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  // parse throws if the data is invalid and nothing after this line will run
  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.body);

  // getting use case using Factory pattern
  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  reply.status(201).send({
    message: "Gym created successfully",
    data: gyms,
  });
}
