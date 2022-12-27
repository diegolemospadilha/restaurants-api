import { OpeningHoursInput } from "./OpeningHoursInput"

export type RestaurantInput = {
    name: string,
    description: string,
    openingHours?: OpeningHoursInput[],
}