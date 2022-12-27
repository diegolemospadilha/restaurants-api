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
       
        const { id:restaurantId, name, description } = data[0];

        
        const openingHours = data.map((openingHour: any) => {
            return {
                dayOfWeek: openingHour.day,
                isOpen: openingHour.is_open,
                opensAt: openingHour.opens_at ?? undefined,
                closesAt: openingHour.closes_at ?? undefined
            }
        })

        const output = { id: restaurantId, name, description, openingHours };
        
        return output;
    }
}