import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricsUseCase } from "../get-user-metrics";

export function makeGetUserMetricsUseCase() {
  // creating a new instance of the repository and injecting into use case
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCase(checkInsRepository);

  return useCase;
}
