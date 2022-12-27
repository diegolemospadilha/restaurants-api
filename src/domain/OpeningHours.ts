export class OpeningHoursDetail {
    constructor(
        readonly id: string,
        readonly day: number,
        readonly isOpen: boolean,
        readonly opensAt: string,
        readonly closesAt: string,
    ){}
}