import * as httpStatus from "http-status";
import { HttpError } from "./httpError";

class Response {
    public status: string;
    public message: string;
    public data: object;
    private code: number;

    constructor(data?: any) {
        // this.code = httpStatus.OK;
        this.status = "success";
        if (data) {
          this.data = data;
        }
    }

    public success(data: object) {
        this.data = data;
        return this;
    }

    public fail(error: HttpError) {
        this.status = "failed";
        this.message = error.message;
        // this.code = error.statusCode || httpStatus.BAD_GATEWAY;
        return this;
    }

    public getStatusCode() {
        return this.code;
    }
}

export default Response;
