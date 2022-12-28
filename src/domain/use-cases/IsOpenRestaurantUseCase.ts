import { RestaurantIsOpenOutput } from "../dto/RestaurantIsOpenOutput";
import { RestaurantNotFound } from "../errors/RestaurantNotFound";
import { RestaurantOut } from "../ports/outbound/RestaurantOut";

export class IsOpenRestaurantUseCase {
    constructor(
        readonly repository: RestaurantOut
    ){}

    private getTimeInSeconds(hour: string){
        const splitHours =  hour.split(':'); 
        return parseInt(splitHours[0]) * 3600 + parseInt(splitHours[1]) * 60 + parseInt(splitHours[2])
    }

    private checkIfRestaurantIsOpenByOpeningHour(timeToBeCompared: string, day: any){
        const dayOpenAtInSeconds = this.getTimeInSeconds(day.opens_at)
        const dayClosesAtInSeconds = this.getTimeInSeconds(day.closes_at)

        const timeInSeconds = this.getTimeInSeconds(timeToBeCompared)

        const isOpen = timeInSeconds >= dayOpenAtInSeconds && timeInSeconds <= dayClosesAtInSeconds;
        return isOpen;
    }

    async execute(id: string, datetime: Date): Promise<RestaurantIsOpenOutput> {
        const data = await this.repository.getById(id);

        if(!data){
            throw new RestaurantNotFound(id);
        }

        const dayToBeSearched = new Date(datetime);
        const dayOfWeek = dayToBeSearched.getDay();
        const time = dayToBeSearched.toTimeString()
        const dayExists = data.filter((restaurantDay: any) => restaurantDay.day === dayOfWeek)

        if(!dayExists) return { isOpen: false}

        const isOpen = dayExists.some((day: any) => this.checkIfRestaurantIsOpenByOpeningHour(time, day));

        const output = { isOpen };
        
        return output;
    }
}