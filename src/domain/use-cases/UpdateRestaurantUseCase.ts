import { RestaurantInput } from "../dto/RestaurantInput";
import { RestaurantOutput } from "../dto/RestaurantOutput";
import { RestaurantNotFound } from "../errors/RestaurantNotFound";
import { RestaurantOut } from "../ports/outbound/RestaurantOut";
import { Restaurant } from "../Restaurant";

export class UpdateRestaurantUseCase {
    constructor(
        readonly repository: RestaurantOut
    ){}

    async execute(id: string, input: RestaurantInput): Promise<RestaurantOutput> {
        const restaurantToBeUpdated = await this.repository.getById(id);

        if(!restaurantToBeUpdated){
            throw new RestaurantNotFound(id);
        }

        const restaurant = new Restaurant(
            restaurantToBeUpdated.id,
            input.name,
            input.description,
        )
            
        const data = await this.repository.update(restaurant);

        const { id: restaurantId, name, description } = data;
        const output = { id: restaurantId, name, description };
        
        return output;
    }
}