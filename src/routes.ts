import { FastifyInstance } from 'fastify';
import { errorHandler } from './handler/ErrorHandler';
import { controllers } from './ioc/controllers'

const controller = controllers.restaurants;

export async function restaurantsRouter(app: FastifyInstance){
    app.get('/restaurants', controller.get.bind(controller));
    app.get('/restaurants/:id', controller.getById.bind(controller));
    app.post('/restaurants', controller.create.bind(controller));
    app.delete('/restaurants/:id', controller.delete.bind(controller));
    app.put('/restaurants/:id', controller.update.bind(controller));
    app.get('/restaurants/:id/isOpen', controller.isOpen.bind(controller));
}

const routes = async (app: FastifyInstance) => {

    app.register(restaurantsRouter)
    .setErrorHandler(errorHandler);
    
    return app;
}

export { routes }