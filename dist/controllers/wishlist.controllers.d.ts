/** Note: imports types */
import type { Request, Response } from "express";
declare class WishlistControllers {
    private wishlistServices;
    /**
     * Note: Add Product to Wishlist
     *
     * Purpose:
     * This controller handles adding a product to the user's wishlist.
     * It validates the incoming request data and delegates the
     * addition to the WishlistService.
     *
     * @param {Request} req - Express request object containing payload.
     * @param {Response} res - Express response object.
     *
     * @returns {Promise<Response>} API response containing the newly created product document
     *
     * Use cases:
     * - User clicks "Add to Wishlist" on a product
     * - Persist the product in the user's wishlist in the database
     *
     * Notes:
     * - Validation is performed using Zod
     * - Returns only success response, does not return the wishlist document
     */
    HandleAddToWishlist: (req: Request, res: Response) => Promise<Response>;
    /**
     * Note: Remove Product from Wishlist
     *
     * Purpose:
     * This controller handles removing a product from the user's wishlist.
     * It validates the incoming request data and delegates the
     * removal to the WishlistService.
     *
     * @param {Request} req - Express request object containing payload.
     * @param {Response} res - Express response object.
     *
     * @returns {Promise<Response>} API response containing the newly created product document
     *
     * Use cases:
     * - User clicks "Remove from Wishlist" on a product
     * - Delete the product from the user's wishlist in the database
     *
     * Notes:
     * - Validation is performed using Zod
     * - Returns only success response, does not return the removed document
     */
    HandleRemoveToWishlist: (req: Request, res: Response) => Promise<Response>;
    /**
     * Note: Get User Wishlists
     *
     * Purpose:
     * This controller retrieves all wishlist items for a specific user.
     * It fetches the wishlist documents using WishlistService.
     *
     * @param {Request} req - Express request object containing authenticated user.
     * @param {Response} res - Express response object.
     *
     * @returns {Promise<Response>} API response containing the newly created product document
     *
     * Use cases:
     * - Display the user's wishlist on the frontend
     * - Keep the client in sync with the server
     *
     * Notes:
     * - The user ID is obtained from the authenticated request (req.user)
     * - Returns an array of wishlist product documents
     */
    HandleGetWishlists: (req: Request, res: Response) => Promise<Response>;
}
export default WishlistControllers;
//# sourceMappingURL=wishlist.controllers.d.ts.map