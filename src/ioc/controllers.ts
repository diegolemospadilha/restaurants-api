import { CreateRestaurantUseCase } from "../domain/use-cases/CreateRestaurantUseCase";
import { DeleteRestaurantUseCase } from "../domain/use-cases/DeleteRestaurantUseCase";
import { GetByIdRestaurantsUseCase } from "../domain/use-cases/GetByIdRestaurantsUseCase";
import { GetRestaurantsUseCase } from "../domain/use-cases/GetRestaurantsUseCase";
import { UpdateRestaurantUseCase } from "../domain/use-cases/UpdateRestaurantUseCase";
import { RestaurantController } from "../infrastructure/controller/RestaurantController";
import { RestaurantRepository } from "../infrastructure/repository/RestaurantRepository";

const repositories = {
    restaurants: new RestaurantRepository(),
}

const useCases = {
    restaurants: {
        getAll: new GetRestaurantsUseCase(repositories.restaurants),
        getById: new GetByIdRestaurantsUseCase(repositories.restaurants),
        create: new CreateRestaurantUseCase(repositories.restaurants),
        delete: new DeleteRestaurantUseCase(repositories.restaurants),
        update: new UpdateRestaurantUseCase(repositories.restaurants),

    }
}
const controllers = {
    restaurants: new RestaurantController(
        useCases.restaurants.getAll,
        useCases.restaurants.getById,
        useCases.restaurants.create,
        useCases.restaurants.delete,
        useCases.restaurants.update,
    ),
}

export { controllers };
