import { FastifyReply, FastifyRequest } from 'fastify';

export class RestaurantController {

    public async get(
        request: FastifyRequest<{}>,
        reply: FastifyReply
        ){
    
    const response = { code: 200};

    reply.status(200).send(response);
    }
}