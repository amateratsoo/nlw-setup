import dotenv from 'dotenv';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { prisma } from './libs/prisma';
import { routes } from './routes';

dotenv.config();

const baseURL = 'http://localhost:5173';
const PORT = (process.env.PORT ?? 3335) as number;
const fastify = Fastify();

function bootstrap() {
  fastify.register(routes);
  fastify.register(cors);

  fastify.listen({ port: PORT, host: '0.0.0.0' }, (error, address) => {
    if (error) fastify.log.error(error);

    console.log(`HTTP server is running on ${address}`);
  });
}

bootstrap();
