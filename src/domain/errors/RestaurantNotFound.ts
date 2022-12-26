import { DomainError } from "./DomainError";

export class RestaurantNotFound extends DomainError {

    constructor(readonly message: string){
        super(404, message);
        
    }
}