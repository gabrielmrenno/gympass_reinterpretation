import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInUseCase } from "../validate-check-in";

export function makeValidateCheckInUseCase() {
  // creating a new instance of the repository and injecting into use case
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInUseCase(checkInsRepository);

  return useCase;
}
