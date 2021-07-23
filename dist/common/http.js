"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponseObject = exports.FailResponseObject = exports.SuccessResponseObject = void 0;
class BaseResponseObject {
    constructor(status, message, data = null) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
class SuccessResponseObject extends BaseResponseObject {
    constructor(message, data) {
        super('success', message, data);
    }
}
exports.SuccessResponseObject = SuccessResponseObject;
class FailResponseObject extends BaseResponseObject {
    constructor(message, data) {
        super("fail", message, data);
    }
}
exports.FailResponseObject = FailResponseObject;
class ErrorResponseObject extends BaseResponseObject {
    constructor(message, data) {
        super('error', message, data);
    }
}
exports.ErrorResponseObject = ErrorResponseObject;
