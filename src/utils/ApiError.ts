class ApiError extends Error {
    
    public statusCode: number;
    public errorcode:string;
    public message: string;
    public errors?: any[] | null;
    

    constructor( statusCode:number, message:string, errorcode:string, errors?:any[] | null, stack?: string){
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errorcode = errorcode;
        this.errors = errors || [];
        if(!stack){
            Error.captureStackTrace(this,this.constructor)
        }else {
            this.stack = stack;
        }
    }

}

export default ApiError;