import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search gyms use case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "JS Gym",
      description: null,
      phone: null,
      latitude: -22.4187356,
      longitude: -45.4770245,
    });

    await gymsRepository.create({
      title: "TS Gym",
      description: null,
      phone: null,
      latitude: -22.4187356,
      longitude: -45.4770245,
    });

    const { gyms } = await sut.execute({
      query: "JS",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "JS Gym" })]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JS Gym ${i}`,
        description: null,
        phone: null,
        latitude: -22.4187356,
        longitude: -45.4770245,
      });
    }

    const { gyms } = await sut.execute({
      query: "JS",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JS Gym 21" }),
      expect.objectContaining({ title: "JS Gym 22" }),
    ]);
  });
});
