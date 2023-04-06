import { CheckIn, Prisma } from "@prisma/client";

export interface ICheckInRepository {
  // Unchecked type: has the relational fields -> representing that dependencies was created before create check
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}
