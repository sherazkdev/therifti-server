/** Note: imports types */
import type { Request, Response } from "express";
declare class ChatControllers {
    private chatService;
    /**
     * Note: Create a new Chat
     *
     * Purpose:
     * This controller handles the creation of a new chat document between users.
     * It validates the request payload and ensures the authenticated user is
     * added to the chat members list.
     *
     * @param {Request} req - Express request object containing payload and authenticated user.
     * @param {Response} res - Express response object.
     *
     * @returns {Promise<Response>} API response containing the newly created product document.
     *
     * Use cases:
     * - User initiates a chat with another user regarding a product
     * - Ensure chat document is created with correct members and product reference
     *
     * Notes:
     * - Validation is performed using Zod
     * - Authenticated user ID is automatically included in chat members
     * - Returns the newly created chat document
     */
    HandleCreateChat: (req: Request, res: Response) => Promise<Response>;
    /**
     * Note: Get Chats
     *
     * Purpose:
     * This controller retrieves chat documents for a user based on filter criteria.
     *
     * @param {Request} req - Express request object containing filter payload.
     * @param {Response} res - Express response object.
     *
     * @returns {Promise<Response>} API response containing the newly created product document.
     *
     * Use cases:
     * - User views their chat list
     * - Retrieve all chats the user is a member of
     *
     * Notes:
     * - Validation is performed using Zod
     * - Returns an array of chat documents
     */
    HandleGetChat: (req: Request, res: Response) => Promise<Response>;
    /**
     * Note: Delete Chat
     *
     * Purpose:
     * This controller handles the deletion of a chat document by its ID.
     *
     * @param {Request} req - Express request object containing chat ID.
     * @param {Response} res - Express response object.
     *
     * @returns {Promise<Response>} API response containing the newly created product document.
     *
     * Use cases:
     * - User deletes a chat conversation
     * - Remove the chat from the database
     *
     * Notes:
     * - Validation is performed using Zod
     * - Returns a success response without the deleted chat document
     */
    HandleDeleteChat: (req: Request, res: Response) => Promise<Response>;
}
export default ChatControllers;
//# sourceMappingURL=chat.controllers.d.ts.map