import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    // query param come in as string, coerce turns into number
    page: z.coerce.number().min(1).default(1),
  });

  // parse throws if the data is invalid and nothing after this line will run
  const { query, page } = searchGymsQuerySchema.parse(request.query);

  // getting use case using Factory pattern
  const searchGymsUseCase = makeSearchGymsUseCase();

  const { gyms } = await searchGymsUseCase.execute({
    query,
    page,
  });

  reply.status(200).send({
    data: gyms,
  });
}
