import type { Request, Response } from "express";
declare class CategoryControllers {
    private categoryServices;
    /**
     * Note: Handle Create Category
     *
     * Purpose:
     * This controller handles the creation of a new category. It validates
     * the request payload using Zod, adds the logged-in user as the owner,
     * and persists the new category via the category service.
     *
     * @param {Request} req - Express request object containing category data.
     * @param {Response} res - Express response object used to return the result.
     *
     * @returns {Promise<Response>} API response confirming category creation.
     *
     * Notes:
     * - Uses `VALIDATE_CREATE_CATEGORY` Zod schema for validation
     * - Throws `ApiError` with BAD_REQUEST if validation fails
     * - Owner is automatically assigned from `req.user`
     */
    HandleCreateCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    /**
     * Note: Handle Update Category
     *
     * Purpose:
     * This controller handles updating an existing category document.
     * It validates the request body and passes it to the category service.
     *
     * @param {Request} req - Express request object containing updated category data.
     * @param {Response} res - Express response object used to return the result.
     *
     * @returns {Promise<Response>} API response confirming category update.
     *
     * Notes:
     * - Uses `VALIDATE_UPDATE_CATEGORY` Zod schema for validation
     * - Throws `ApiError` with BAD_REQUEST if validation fails
     * - Calls `categoryServices.UpdateCategory` to perform the update
     */
    HandleUpdateCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    /**
     * Note: Handle Delete Category
     *
     * Purpose:
     * This controller handles deletion of a category by its ID.
     * It validates the request body and calls the service to remove the category.
     *
     * @param {Request} req - Express request object containing `categoryId`.
     * @param {Response} res - Express response object used to return the result.
     *
     * @returns {Promise<Response>} API response confirming category deletion.
     *
     * Notes:
     * - Uses `VALIDATE_DELETE_CATEGORY` Zod schema for validation
     * - Throws `ApiError` with BAD_REQUEST if validation fails
     * - Calls `categoryServices.DeleteCategory` to delete the category
     */
    HandleDeleteCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    /**
     * Note: Handle Get Categories
     *
     * Purpose:
     * Retrieves all category documents from the database.
     *
     * @param {Request} req - Express request object (no body needed).
     * @param {Response} res - Express response object used to return the result.
     *
     * @returns {Promise<Response>} API response containing all categories.
     *
     * Notes:
     * - Calls `categoryServices.GetAllCategories` to fetch category documents
     * - Returns categories wrapped in a standardized `ApiResponse`
     */
    HandleGetCategories: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
export default CategoryControllers;
//# sourceMappingURL=category.controlles.d.ts.map