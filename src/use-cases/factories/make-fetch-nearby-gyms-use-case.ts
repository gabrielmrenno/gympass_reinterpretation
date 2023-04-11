import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";

export function makeFetchNearbyGymsUseCase() {
  // creating a new instance of the repository and injecting into use case
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
}
