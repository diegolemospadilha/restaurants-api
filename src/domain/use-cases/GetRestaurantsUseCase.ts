import { RestaurantOutput } from "../dto/RestaurantOutput";
import { RestaurantOut } from "../ports/outbound/RestaurantOut";

export class GetRestaurantsUseCase {
    constructor(
        readonly repository: RestaurantOut
    ){}

    async execute(): Promise<RestaurantOutput[]> {
        const output: RestaurantOutput[] = [];
        const data = await this.repository.getAll();
        for(const restaurant of data){
            const { id, name, description } = restaurant
            output.push({ id, name, description })
        }

        return output;
    }
}