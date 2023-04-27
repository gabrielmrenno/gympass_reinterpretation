import { FastifyRequest, FastifyReply } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  // validate if user is authenticated seeing on cookies, where refreshToken is
  await request.jwtVerify({ onlyCookie: true });

  // setting token from JWT, setting sub as user id
  const token = await reply.jwtSign(
    // payload: additional info in token
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    }
  );

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d",
      },
    }
  );

  // putting refresh token on cookies -> cookies can be avoided to be accessed by client
  reply
    .setCookie("refreshToken", refreshToken, {
      // which route can access: "/" all routes on back-end
      path: "/",
      // cookies encrypted bt HTTPs
      secure: true,
      sameSite: true,
      // only can be accessed by back end, by request and response
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    });
}
