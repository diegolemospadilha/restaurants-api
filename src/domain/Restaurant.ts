import { OpeningHoursDetail } from "./OpeningHours";

export class Restaurant {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly description: string,
        readonly openingHours?: OpeningHoursDetail[]
    ){}
}