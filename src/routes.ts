import { FastifyInstance } from 'fastify';
import { controllers } from './ioc/controllers'

const controller = controllers.restaurants;

export async function restaurantsRouter(app: FastifyInstance){
    app.get('/restaurants', controller.get.bind(controller))
}

const routes = (app: FastifyInstance) => {
    return app.register(restaurantsRouter);
}

export { routes }