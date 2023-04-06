import { IUsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileCaseRequest {
  userId: string;
}

interface GetUserProfileCaseResponse {
  user: User;
}

export class GetUserProfileCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileCaseRequest): Promise<GetUserProfileCaseResponse> {
    // search user on db by email and compare password
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
