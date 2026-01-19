import type { Request, Response, NextFunction } from "express";
declare const AsyncHandler: (fc: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => Promise<any>;
export default AsyncHandler;
//# sourceMappingURL=AsyncHandler.d.ts.map