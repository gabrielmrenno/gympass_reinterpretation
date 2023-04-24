import request from "supertest";
import { app } from "@/app";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Nearby gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search a nearby gym", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "Some description",
        phone: "1199999999",
        latitude: -22.4187356,
        longitude: -45.4770245,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        description: "Some description",
        phone: "1199999999",
        latitude: -22.3114915,
        longitude: -45.362409,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -22.4187356,
        longitude: -45.4770245,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data).toEqual([
      expect.objectContaining({
        title: "JavaScript Gym",
      }),
    ]);
  });
});
