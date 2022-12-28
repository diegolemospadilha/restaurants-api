export class DomainError extends Error {

    readonly httpStatusCode: number;

    constructor(
        readonly message: string,
        readonly httpCode: number,
    ){
        super();
        this.message = message;
        this.httpStatusCode = httpCode ?? 500
    }
}