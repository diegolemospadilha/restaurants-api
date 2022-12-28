import { DomainError } from "./DomainError";

export class RestaurantNotFound extends DomainError {

    constructor(readonly id: string){
        super(`Restaurant not found to id: ${id}`, 404);      
    }
}