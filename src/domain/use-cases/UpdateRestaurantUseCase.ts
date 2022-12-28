import { v4 as uuidv4 } from 'uuid';
import { RestaurantInput } from "../dto/RestaurantInput";
import { RestaurantOutput } from "../dto/RestaurantOutput";
import { RestaurantNotFound } from "../errors/RestaurantNotFound";
import { OpeningHoursDetail } from "../OpeningHours";
import { RestaurantOut } from "../ports/outbound/RestaurantOut";
import { Restaurant } from "../Restaurant";

export class UpdateRestaurantUseCase {
    constructor(
        readonly repository: RestaurantOut
    ){}

    async execute(id: string, input: RestaurantInput): Promise<RestaurantOutput> {
        const [restaurantToBeUpdated] = await this.repository.getById(id);

        if(!restaurantToBeUpdated){
            throw new RestaurantNotFound(id);
        }

        const openingHours = input.openingHours ? input.openingHours.map(
            (hour) => new OpeningHoursDetail(
                uuidv4(),
                hour.dayOfWeek,
                hour.isOpen,
                hour.opensAt,
                hour.closesAt
            )
        ) : undefined;

        const restaurant = new Restaurant(
            restaurantToBeUpdated.restaurant_id,
            input.name,
            input.description,
            openingHours
        )
            
        await this.repository.update(restaurant);
        
        const restaurantUpdated = await this.repository.getById(id);
        const { restaurant_id: restaurantId, name, description } = restaurantUpdated[0];

        const openingHoursData = restaurantUpdated.map((openingHour: any) => {
            return {
                dayOfWeek: openingHour.day,
                isOpen: openingHour.is_open,
                opensAt: openingHour.opens_at ?? undefined,
                closesAt: openingHour.closes_at ?? undefined
            }
        })
        const output = { id:restaurantId, name, description, openingHours: openingHoursData };
        
        return output;
    }
}