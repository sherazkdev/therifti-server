type ErrorDetail = {
  field: string
  message: string
}

class ApiError extends Error {
    
    public statusCode: number;
    public message: string;
    public errors?: ErrorDetail[] | null;
    

    constructor( statusCode:number, message:string, errors?:any[] | null, stack?: string){
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors || [];
        if(!stack){
            Error.captureStackTrace(this,this.constructor)
        }else {
            this.stack = stack;
        }
    }

}

export default ApiError;