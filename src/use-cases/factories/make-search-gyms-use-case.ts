import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymsUseCase } from "../search-gyms";

export function makeSearchGymsUseCase() {
  // creating a new instance of the repository and injecting into use case
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase;
}
