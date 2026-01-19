class ApiResponse {
    protected data: unknown;
    protected message: string;
    protected success: boolean;
    protected statusCode: number;

    constructor( data: unknown, message:string, success:boolean, statusCode:number){
        this.data = data || "";
        this.message = message;
        this.success = success;
        this.statusCode = statusCode;
    }
}

export default ApiResponse;