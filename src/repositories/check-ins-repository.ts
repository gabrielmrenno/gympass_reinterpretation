import { CheckIn, Prisma } from "@prisma/client";

export interface ICheckInRepository {
  // Unchecked type: has the relational fields -> representing that dependencies was created before create check
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;

  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;

  countByUserId(userId: string): Promise<number>;
}
