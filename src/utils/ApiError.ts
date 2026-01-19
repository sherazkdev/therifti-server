class ApiError extends Error {
    
    protected statusCode: number;
    public message: string;
    protected errors?: any[] | null;
    

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