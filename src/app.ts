import fastify from 'fastify';
import { routes } from './routes';

const app = fastify({
    logger: { level: 'info' }
});

app.register(routes);

export { app };