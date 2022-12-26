export class DomainError extends Error {

    readonly httpStatusCode: number;

    constructor(
        readonly httpCode: number,
        readonly message: string
    ){
        super();
        this.httpStatusCode = httpCode ? httpCode : 500
        this.message = message;
    }
}