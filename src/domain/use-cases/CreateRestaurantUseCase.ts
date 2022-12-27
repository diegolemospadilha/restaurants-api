import { v4 as uuidv4 } from 'uuid';
import { RestaurantInput } from "../dto/RestaurantInput";
import { RestaurantOutput } from "../dto/RestaurantOutput";
import { OpeningHoursDetail } from '../OpeningHours';
import { RestaurantOut } from "../ports/outbound/RestaurantOut";
import { Restaurant } from "../Restaurant";

export class CreateRestaurantUseCase {
    constructor(
        readonly repository: RestaurantOut
    ){}

    async execute(input: RestaurantInput): Promise<RestaurantOutput> {

        const openingHours = input.openingHours ? input.openingHours.map(
            (hour) => new OpeningHoursDetail(
                uuidv4(),
                hour.dayOfWeek,
                hour.isOpen,
                hour.opensAt,
                hour.closesAt
            )
        ) : undefined;

        const restaurantId = uuidv4();

        const restaurant = new Restaurant(
            restaurantId,
            input.name,
            input.description,
            openingHours
        );
        const ix = await this.repository.create(restaurant);
        const data = await this.repository.getById(restaurantId);
        const { id, name, description } = data;
        const output = { id, name, description };
        
        return output;
    }
}