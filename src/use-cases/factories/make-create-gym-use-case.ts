import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymUseCase } from "../create-gym";

export function makeCreateGymUseCase() {
  // creating a new instance of the repository and injecting into use case
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CreateGymUseCase(gymsRepository);

  return useCase;
}
