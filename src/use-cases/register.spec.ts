import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register use case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(inMemoryUsersRepository);
  });
  it("should hash user password upon registration", async () => {
    const { newUser } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(newUser.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { newUser } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      newUser.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with an email twice", async () => {
    const email = "johndoe@example.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    // expect that the promise throw an error
    await expect(() =>
      sut.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
