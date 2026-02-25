import type { CategoryDocument, CategoryWithDescendants, CreateCategoryInterface, UpdateCategoryInterface } from "../interfaces/category.interfaces.js";
declare class CategoryServices {
    /**
     * Note: Create a new category.
     *
     * This method creates a new category document in the database.
     * Optionally, it can be a subcategory if `parentId` is provided.
     *
     * @param {CreateCategoryInterface} categoryObject - The data object for creating a category.
     * @param {string} [categoryObject.title] - Category document title (Required).
     * @param {string} [categoryObject.owner] - Owner of the category (Required).
     * @param {string} [categoryObject.parent] - Optional parent category ID for subcategories (Optional).
     * @param {string} [categoryObject.image] - Image of the category (Optional).
     * @param {string} [categoryObject.status] - Category active status.
     *
     * @returns {Promise<CategoryDocument>} The newly created category document.
     *
     * @throws {ApiError} Throws error if category not found | validation fails or DB operation fails.
    */
    CreateCategory(categoryObject: CreateCategoryInterface): Promise<CategoryDocument>;
    /**
     * Note: Update an existing category by its ID.
     *
     * This method updates a category document in the database.
     * You can update the category name, image, parent category, or active status.
     *
     * @param {object} updateCategoryData - The fields to update.
     * @param {object} [updateCategoryData.categoryId] - The categoryId of the category to update.
     * @param {object} [updateCategoryData.title] - Update name of categoryDocument.
     * @param {object} [updateCategoryData.image] - Update image of categoryDocument..
     * @param {object} [updateCategoryData.parent] - Update category parentId for example (for moving subcategories).
     * @param {object} [updateCategoryData.status] - Category status update.
     *
     * @returns {Promise<CategoryDocument>} The updated category document.
     * @throws {ApiError} Throws error if the category is not found or update fails.
    */
    UpdateCategory(updateCategoryData: UpdateCategoryInterface): Promise<CategoryDocument>;
    /**
     * Note: Fetch all categories in a hierarchical structure.
     *
     * This method retrieves all categories from the database in a nested tree format.
     * - Parent (top-level) categories include their images.
     * - Direct subcategories include their images.
     * - Deeper subcategories (grandchildren and beyond) exclude images.
     * - The structure maintains the hierarchy for easy tree traversal.
     *
     *  @returns {Promise<Array>} Returns a promise that resolves to an array of category objects:
    */
    GetAllCategories(): Promise<CategoryWithDescendants[]>;
    /**
     * Note: Build nested tree structure for categories.
     *
     * This helper method converts a flat descendants array (returned from $graphLookup)
     * into a properly nested hierarchical tree.
     *
     * It recursively finds all child categories of the given parentId
     * and attaches them under `subCategories`.
     *
     * @param {string | ObjectId} parentId - The _id of the parent category.
     * @param {Array<CategoryDocument>} descendants - Flat array of all descendant category documents.
     * @returns {Array<CategoryDocument>} Returns nested subCategories tree for the given parent.
    */
    BuildCategoriesTree(parent: any, descendants: CategoryDocument[]): any;
    /**
     * Note: Delete a category by its ID.
     *
     * This method removes a category document from the database
     * using the provided categoryId.
     *
     * ⚠ Important:
     * - If the category has subcategories, you may need to handle
     *   cascading deletion or prevent deletion based on business logic.
     * - This method should validate whether the category exists before deletion.
     *
     * @param {string} categoryId - The unique identifier of the category to delete.
     *
     * @returns {Promise<CategoryDocument | null>}
     * Returns the deleted category document if successful,
     * or null if no category was found.
     *
     * @throws {ApiError} Throws an error if the category does not exist
     * or if the deletion operation fails.
    */
    DeleteCategory(categoryId: string): Promise<boolean>;
}
export default CategoryServices;
//# sourceMappingURL=category.services.d.ts.map