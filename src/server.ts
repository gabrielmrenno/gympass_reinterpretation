import { app } from "./app";
import { env } from "./env";

app
  // listen is an async function
  .listen({
    // to be accessible from a front-end with less problems
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log("Server is running");
  });
