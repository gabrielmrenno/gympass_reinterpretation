import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    // automatic jwt token on request by headers and attach info on request
    await request.jwtVerify();
  } catch (error) {
    reply.status(401).send({ message: "Unauthorized." });
  }
}
