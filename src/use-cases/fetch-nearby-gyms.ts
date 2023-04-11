import { Gym } from "@prisma/client";
import { IGymsRepository } from "@/repositories/gyms-repository";

interface FetchNearbyGymsRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsRequest): Promise<FetchNearbyGymsResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
