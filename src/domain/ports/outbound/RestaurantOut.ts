import { Restaurant } from "../../Restaurant";

export interface RestaurantOut {
    getAll(): Promise<any>;
    getById(id: string): Promise<any>;
    create(input: Restaurant): Promise<Restaurant>;
    update(input: Restaurant): Promise<Restaurant>;
    delete(id: string): Promise<void>;
}