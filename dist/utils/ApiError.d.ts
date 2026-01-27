declare class ApiError extends Error {
    statusCode: number;
    message: string;
    errors?: any[] | null;
    constructor(statusCode: number, message: string, errors?: any[] | null, stack?: string);
}
export default ApiError;
//# sourceMappingURL=ApiError.d.ts.map