class ApiError extends Error {
    statusCode;
    message;
    errors;
    constructor(statusCode, message, errors, stack) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors || [];
        if (!stack) {
            Error.captureStackTrace(this, this.constructor);
        }
        else {
            this.stack = stack;
        }
    }
}
export default ApiError;
//# sourceMappingURL=ApiError.js.map