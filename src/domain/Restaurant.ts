import { OpeningHoursDetail } from "./OpeningHoursDetail";

export class Restaurant {
    constructor(
        readonly name: string,
        readonly description: string,
        readonly openingHours: OpeningHoursDetail[]
    ){}
}