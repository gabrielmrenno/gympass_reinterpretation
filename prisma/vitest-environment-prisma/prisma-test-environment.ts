import { Environment } from "vitest";

export default <Environment>{
  name: "prisma",
  // code to be executed before each file tests
  async setup() {
    console.log("setup");

    return {
      // after tests to be executed
      teardown() {
        console.log("teardown");
      },
    };
  },
};
