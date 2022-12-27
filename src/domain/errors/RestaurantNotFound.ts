import { DomainError } from "./DomainError";

export class RestaurantNotFound extends DomainError {

    constructor(readonly id: string){
        super(404, `Restaurant not found to id: ${id}`);      
    }
}