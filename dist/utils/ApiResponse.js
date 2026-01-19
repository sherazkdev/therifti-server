class ApiResponse {
    data;
    message;
    success;
    statusCode;
    constructor(data, message, success, statusCode) {
        this.data = data || "";
        this.message = message;
        this.success = success;
        this.statusCode = statusCode;
    }
}
export default ApiResponse;
//# sourceMappingURL=ApiResponse.js.map