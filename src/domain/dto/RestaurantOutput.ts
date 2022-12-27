import { OpeningHoursOutput } from "./OpeningHoursOutput"

export type RestaurantOutput = {
    id: string,
    name: string,
    description: string
    openingHours?: OpeningHoursOutput[]
}