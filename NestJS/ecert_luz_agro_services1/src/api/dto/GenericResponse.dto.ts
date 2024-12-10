export interface GenericResponse {
    code: string;
    message: string;
    data: any;
}

export class GenericResponse implements GenericResponse {
    constructor() {
        this.message = StatusCode.SUCCESS;
        this.code = '0';
    }
}

export enum StatusCode {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}