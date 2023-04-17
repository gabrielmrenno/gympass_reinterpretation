import request from "supertest";
import { app } from "@/app";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Auhtenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    // create an account
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "johndoe@mail.com",
      password: "123456",
    });

    const response = await request(app.server).post("/sessions").send({
      email: "johndoe@mail.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
