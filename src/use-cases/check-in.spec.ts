import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let usersRepository: InMemoryCheckInRepository;
let sut: CheckInUseCase;

describe("Check in use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryCheckInRepository();
    sut = new CheckInUseCase(usersRepository);

    // to mock date
    vi.useFakeTimers();
  });

  afterEach(() => {
    // returning to original state
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    // setting "now()" to an specific date time
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in more than once at the same day", async () => {
    // setting "now()" to an specific date time
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in different days", async () => {
    // setting "now()" to an specific date time
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
