import * as HttpStatus from "http-status";

enum ErrorReason {
    INVALID_INPUT = HttpStatus.BAD_REQUEST,
    UNAUTHORIZED = HttpStatus.UNAUTHORIZED,
    FORBIDDEN = HttpStatus.FORBIDDEN,
    NOT_FOUND = HttpStatus.NOT_FOUND,
    UNKNOWN = HttpStatus.BAD_GATEWAY,
}

class HttpError extends Error {
    public isKnownError: boolean;
    public statusCode: number;

    constructor(message: string, errorReason?: ErrorReason) {
        super(message);
        this.statusCode = errorReason || ErrorReason.UNKNOWN;
        this.isKnownError = true;
    }
}

export { HttpError, ErrorReason };
