/** Note: imports types */
import type { Request, Response } from "express";
declare class BrandControllers {
    private brandServices;
    /**
     * Note: Create Brand Document.
     * @param {Request} req - Request Object.
     * @param {Response} res - Response Object.
     *
     * @returns {Promise<Response>} Created brand document.
    */
    HandleCreateBrand: (req: Request, res: Response) => Promise<Response>;
    /**
     * Note: Get Brand By Category.
     * @param {Request} req - Request Object.
     * @param {Response} res - Response Object.
     *
     * @returns {Promise<Response>} Matched Brands.
    */
    HandleGetBrandByCategory: (req: Request, res: Response) => Promise<Response>;
}
export default BrandControllers;
//# sourceMappingURL=brand.controllers.d.ts.map