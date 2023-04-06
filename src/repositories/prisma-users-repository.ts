import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaUsersRepository {
  // Prisma has integration with TypeScript and it has types to some methods
  async create(data: Prisma.UserCreateInput) {
    // create a new user
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
