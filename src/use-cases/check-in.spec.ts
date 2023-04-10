import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime";

let usersRepository: InMemoryCheckInRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check in use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryCheckInRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(usersRepository, gymsRepository);

    // create an fake gym to the tests
    gymsRepository.items.push({
      id: "gym-01",
      title: "JS Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-22.4187356),
      longitude: new Decimal(-45.4770245),
    });

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
      userLatitude: -22.4187356,
      userLongitude: -45.4770245,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in more than once at the same day", async () => {
    // setting "now()" to an specific date time
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -22.4187356,
      userLongitude: -45.4770245,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -22.4187356,
        userLongitude: -45.4770245,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in different days", async () => {
    // setting "now()" to an specific date time
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -22.4187356,
      userLongitude: -45.4770245,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -22.4187356,
      userLongitude: -45.4770245,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "JS Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-22.4031758),
      longitude: new Decimal(-45.5326194),
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -22.4187356,
        userLongitude: -45.4770245,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
