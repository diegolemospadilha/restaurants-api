import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { errorHandler } from './handler/ErrorHandler';
import { controllers } from './ioc/controllers'
import { swaggerOptions } from './docs/swagger';
import { 
    deleteRestaurantsDoc, 
    getByIdRestaurantsDoc, 
    getRestaurantsDoc, 
    isOpenRestaurantsDoc, 
    postRestaurantsDoc,
    updateRestaurantsDoc
} from './docs/restaurant';

const controller = controllers.restaurants;

export async function restaurantsRouter(app: FastifyInstance){
    app.get('/restaurants', {
        schema: getRestaurantsDoc
    },controller.get.bind(controller));
    app.get('/restaurants/:id', {
        schema: getByIdRestaurantsDoc,
    }, controller.getById.bind(controller));
    app.post('/restaurants', {
        schema: postRestaurantsDoc
    }, controller.create.bind(controller));
    app.delete('/restaurants/:id', {
        schema: deleteRestaurantsDoc
    }, controller.delete.bind(controller));
    app.put('/restaurants/:id', {
        schema: updateRestaurantsDoc,
    }, controller.update.bind(controller));
    app.get('/restaurants/:id/isOpen', {
        schema: isOpenRestaurantsDoc
    }, controller.isOpen.bind(controller));
}

const routes = async (app: FastifyInstance) => {

    await app.register(require('fastify-swagger'), swaggerOptions);

    app.register(restaurantsRouter)
    .setErrorHandler(errorHandler);
    
    return app;
}

export { routes }