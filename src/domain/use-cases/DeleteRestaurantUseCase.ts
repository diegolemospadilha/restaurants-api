import { RestaurantOut } from "../ports/outbound/RestaurantOut";

export class DeleteRestaurantUseCase {
    constructor(
        readonly repository: RestaurantOut
    ){}

    async execute(id: string): Promise<void> {
        return await this.repository.delete(id);
    }
}