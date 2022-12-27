import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateRestaurantUseCase } from '../../domain/use-cases/CreateRestaurantUseCase';
import { DeleteRestaurantUseCase } from '../../domain/use-cases/DeleteRestaurantUseCase';
import { GetByIdRestaurantsUseCase } from '../../domain/use-cases/GetByIdRestaurantsUseCase';
import { GetRestaurantsUseCase } from '../../domain/use-cases/GetRestaurantsUseCase';
import { UpdateRestaurantUseCase } from '../../domain/use-cases/UpdateRestaurantUseCase';

export class RestaurantController {

    constructor(
        readonly getAllRestaurantsUseCase: GetRestaurantsUseCase,
        readonly getByIdRestaurantsUseCase: GetByIdRestaurantsUseCase,
        readonly createRestaurantsUseCase: CreateRestaurantUseCase,
        readonly deleteRestaurantUseCase: DeleteRestaurantUseCase,
        readonly updateRestaurantUseCase: UpdateRestaurantUseCase,
    ){}

    public async get(
        request: FastifyRequest<{}>,
        reply: FastifyReply
        ){
    
    const response = await this.getAllRestaurantsUseCase.execute();

    reply.status(200).send(response);
    }

    public async getById(
        request: FastifyRequest<{
            Params: { id: string }
        }>,
        reply: FastifyReply
        ){
    
    const response = await this.getByIdRestaurantsUseCase.execute(request.params.id);

    reply.status(200).send(response);
    }

    public async create(
        request: FastifyRequest<{
            Body: { 
                name: string,
                description: string
                openingHours: Array<{
                    dayOfWeek: number,
                    isOpen: boolean
                    opensAt: string,
                    closesAt: string,
                }>
            }
        }>,
        reply: FastifyReply
        ){
    
        const response = await this.createRestaurantsUseCase.execute(request.body);

        reply.status(201).send(response);
    }

    public async delete(
        request: FastifyRequest<{
            Params: { id: string }
        }>,
        reply: FastifyReply
        ){
    
    await this.deleteRestaurantUseCase.execute(request.params.id);

    reply.status(204).send();
    }

    public async update(
        request: FastifyRequest<{
            Params: { id: string }
            Body: { 
                name: string,
                description: string
            }
        }>,
        reply: FastifyReply
        ){
    
    const response = await this.updateRestaurantUseCase.execute(request.params.id, request.body);

    reply.status(200).send(response);
    }
}