import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    // refine make an custom validation on data
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  // parse throws if the data is invalid and nothing after this line will run
  const { title, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body);

  // getting use case using Factory pattern
  const createGymUseCase = makeCreateGymUseCase();

  await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  });

  reply.status(201).send({
    message: "Gym created successfully",
  });
}
