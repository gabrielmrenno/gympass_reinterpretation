import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";
import { Decimal } from "@prisma/client/runtime";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Register use case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "JS Gym",
      description: null,
      phone: null,
      latitude: -22.4187356,
      longitude: -45.4770245,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
