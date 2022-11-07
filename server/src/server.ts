import Fastify from "fastify";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors";
import { pollRoutes } from "./routes/poll";
import { authRoutes } from "./routes/auth";
import { gameRoutes } from "./routes/game";
import { guessRoutes } from "./routes/guess";
import { userRoutes } from "./routes/user";


async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(cors, {
        //importante substituir esta opção de "true" pelo domínio do site quando o mesmo estiver em produção. 
        origin: true
    });

    await fastify.register(jwt, {
        secret: "nlwcopa",
    })

    //Em produção isso precisa ser uma varável ambiente.

    await fastify.register(pollRoutes);
    await fastify.register(authRoutes);
    await fastify.register(gameRoutes);
    await fastify.register(guessRoutes);
    await fastify.register(userRoutes);

    await fastify.listen({ port: 3333, host: "0.0.0.0" });
}

bootstrap();