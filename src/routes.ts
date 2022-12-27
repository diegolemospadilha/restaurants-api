require('dotenv').config()
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

    // Registers CORS
    app.register(require('fastify-cors'), { 
        origin: [
        `http://localhost:${process.env.PORT}`,
        `http://127.0.0.1:${process.env.PORT}`, 
        process.env.HEROKU_URL
        ],
        methods: ['GET', 'PUT', 'POST', 'DELETE']
  })

    await app.register(require('fastify-swagger'), swaggerOptions);

    app.register(restaurantsRouter)
    .setErrorHandler(errorHandler);
    
    return app;
}

export { routes }