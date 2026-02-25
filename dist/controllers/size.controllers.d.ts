/** Note: imports types */
import type { Request, Response } from "express";
declare class SizeControllers {
    private sizeServices;
    /**
     * Note: Note: Handle Create Size Document.
     * @param {Request} req - Request Object.
     * @param {Response} res - Response Object.
     *
     * @returns {Promise<ApiResponse>} Created Size document.
    */
    HandleCreateSize: (req: Request, res: Response) => Promise<Response>;
    /**
     * Note: Handle Get Size By Category.
     * @param {Request} req - Request Object.
     * @param {Response} res - Response Object.
     *
     * @returns {Promise<ApiResponse>} Matched Sizes.
    */
    HandleGetSizeByCategory: (req: Request, res: Response) => Promise<Response>;
    /**
     * Note: Handle Update Size Document.
     * @param {Request} req - Request Object to get values.
     * @param {Response} res - Response Object sendeing respond.
     *
     * @returns {Promise<ApiResponse>} Updated Size Document.
     * @throws {ApiError} If Size document does not exist.
    */
    HandleUpdateSize: (req: Request, res: Response) => Promise<Response>;
    /**
     * Note Handle Delete size Docuemnt.
     * @param {Request} req - Request Object to get values.
     * @param {Response} res - Response Object sendeing respond.
     * @throws {ApiError} If Size document does not exist.
    */
    HandleDeleteSize: (req: Request, res: Response) => Promise<Response>;
}
export default SizeControllers;
//# sourceMappingURL=size.controllers.d.ts.map