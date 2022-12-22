import { RestaurantController } from "../infrastructure/RestaurantController";

const controllers = {
    restaurants: new RestaurantController(),
}

export { controllers };
