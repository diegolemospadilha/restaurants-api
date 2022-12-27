import { RestaurantOutput } from "../dto/RestaurantOutput";
import { RestaurantNotFound } from "../errors/RestaurantNotFound";
import { RestaurantOut } from "../ports/outbound/RestaurantOut";

export class GetByIdRestaurantsUseCase {
    constructor(
        readonly repository: RestaurantOut
    ){}

    async execute(id: string): Promise<RestaurantOutput> {
        const data = await this.repository.getById(id);

        if(!data){
            throw new RestaurantNotFound(id);
        }
       
        const { id:restaurantId, name, description } = data;
        const output = { id: restaurantId, name, description };
        
        return output;
    }
}