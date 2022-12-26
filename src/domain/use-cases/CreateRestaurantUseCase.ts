import { v4 as uuidv4 } from 'uuid';
import { RestaurantInput } from "../dto/RestaurantInput";
import { RestaurantOutput } from "../dto/RestaurantOutput";
import { RestaurantOut } from "../ports/outbound/RestaurantOut";
import { Restaurant } from "../Restaurant";

export class CreateRestaurantUseCase {
    constructor(
        readonly repository: RestaurantOut
    ){}

    async execute(input: RestaurantInput): Promise<RestaurantOutput> {
        const restaurant = new Restaurant(
            uuidv4(),
            input.name,
            input.description
        );
        const data = await this.repository.create(restaurant);
        const { id, name, description } = data;
        const output = { id, name, description };
        
        return output;
    }
}