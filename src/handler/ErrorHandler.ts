import { FastifyReply, FastifyRequest } from "fastify";
import { DomainError } from "../domain/errors/DomainError";

export function errorHandler( error: DomainError,
    request: FastifyRequest,
    reply: FastifyReply,){

    reply.status(error.httpCode)
    .send({
        message: error.message
    })
}