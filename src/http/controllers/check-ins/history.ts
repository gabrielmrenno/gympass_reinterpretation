import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";
import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    // page param come in as string, coerce turns into number
    page: z.coerce.number().min(1).default(1),
  });

  // parse throws if the data is invalid and nothing after this line will run
  const { page } = checkInHistoryQuerySchema.parse(request.query);

  // getting use case using Factory pattern
  const fetchUserCheckInUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await fetchUserCheckInUseCase.execute({
    userId: request.user.sub,
    page,
  });

  reply.status(200).send({
    data: checkIns,
  });
}
