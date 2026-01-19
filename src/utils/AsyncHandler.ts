import type { Request,Response,NextFunction} from "express"

const AsyncHandler = (fc:( req:Request, res:Response, next:NextFunction) => Promise<any>) => {
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            return await fc(req,res,next);
        } catch (e) {
            next(e);
        }
    }
}
export default AsyncHandler;