import { RestaurantIsOpenOutput } from "../dto/RestaurantIsOpenOutput";
import { RestaurantNotFound } from "../errors/RestaurantNotFound";
import { RestaurantOut } from "../ports/outbound/RestaurantOut";

export class IsOpenRestaurantUseCase {
    constructor(
        readonly repository: RestaurantOut
    ){}

    async execute(id: string, datetime: Date): Promise<RestaurantIsOpenOutput> {
        const data = await this.repository.getById(id);

        if(!data){
            throw new RestaurantNotFound(id);
        }
       
        const { id:restaurantId, name, description } = data;
        const output = { isOpen: true };
        
        return output;
    }
}