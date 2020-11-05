import { IError } from './error.interface';

export class ApiError implements IError {
    code: number;

    error: string;

    constructor(code: number, error: string) {
        this.code = code;
        this.error = error;
    }
}
