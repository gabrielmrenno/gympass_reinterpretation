import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileCase } from "../get-user-profile";

export function makeGetUserProfileUseCase() {
  // creating a new instance of the repository and injecting into use case
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfileCase(usersRepository);

  return useCase;
}
