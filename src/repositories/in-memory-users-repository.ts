import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class InMemoryUsersRepository {
  public users: any = [];

  async create(data: Prisma.UserCreateInput) {
    // create a new user
    this.users.push(data);
  }
}