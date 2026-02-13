import mongoose from "mongoose";
import { ERROR_MESSAGES, STATUS_CODES } from "../constants/responseConstants.js";
import type { CategoryDocument, CategoryWithDescendants, CreateCategoryInterface, UpdateCategoryInterface } from "../interfaces/category.interfaces.js";
import CategoryModel from "../models/category.model.js";

/** Api Services */
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/** Services */
import ProductModel from "../models/product.model.js";

class CategoryServices {

    /**
     * Note: Create a new category.
     * 
     * This method creates a new category document in the database.
     * Optionally, it can be a subcategory if `parentId` is provided.
     * 
     * @param {object} categoryObject - The data object for creating a category.
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
    public async CreateNewCategory(categoryObject:CreateCategoryInterface):Promise<CategoryDocument> {
        const {owner,title,image,parent,status} = categoryObject;
        /** Note: Duplicate category is exist. */
        const category = await CategoryModel.findOne({
            title:title
        });
        if(category) throw new ApiError(STATUS_CODES.UNAUTHORIZED,ERROR_MESSAGES.CATEGORY.ALREADY_EXIST);
        const categoryDocument = await CategoryModel.create({
            owner:new mongoose.Types.ObjectId(owner),
            parent:new mongoose.Types.ObjectId(parent) || null,
            title:title,
            image:image || null,
            status:status
        });

        return categoryDocument;
    };

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
    public async UpdateCategory(updateCategoryData:UpdateCategoryInterface):Promise<CategoryDocument> {
        const {categoryId,status,title,image,parent} = updateCategoryData;
        /** Note: Check Category exist. */
        const category = await CategoryModel.findById(new mongoose.Types.ObjectId(categoryId));
        if(!category) throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.CATEGORY.NOT_FOUND);
        /** Note: Assing Category document values. */
        category.title = title;
        category.status = status;
        category.image = image || null;
        category.parent = new mongoose.Types.ObjectId(parent) || null;
        await category.save();

        return category;
    };

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
    public async GetAllCategories():Promise<CategoryWithDescendants[]> {

        const categories = await CategoryModel.aggregate<CategoryWithDescendants>([
            {
                $match:{
                    $expr : {
                        $eq : ["$parent",null]
                    }
                }
            },
            {
                $graphLookup : {
                    from:"categories",
                    startWith:"$_id",
                    connectFromField:"_id",
                    connectToField:"parent",
                    as:"descendants"
                }
            }
        ]);
        const allCategories = categories.map( (c) => this.BuildCategoriesTree(c,c.descendants))
        allCategories.forEach( cat => delete cat?.descendants);
        /** Note: Build a tree. */
        return allCategories;
    };

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
    public BuildCategoriesTree(parent:any,descendants:CategoryDocument[]):any {
        
        const children = descendants.filter( (category) => category.parent?.toString() === String(parent?._id));
        if(children.length > 0){
            parent.children = children.map( child => this.BuildCategoriesTree(child,descendants))
        }
        return parent;
    };

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
    public async DeleteCategory(categoryId:string):Promise<boolean> {
        /** Note: Check Category Exist. */
        const category = await CategoryModel.findById(new mongoose.Types.ObjectId(categoryId));
        if(!category) throw new ApiError(STATUS_CODES.UNAUTHORIZED,ERROR_MESSAGES.CATEGORY.NOT_FOUND);
        /** Note: Check category subcategories. */
        const subCategoriesLength = await CategoryModel.countDocuments({parent:new mongoose.Types.ObjectId(categoryId)});
        
        /** Note: Check Product exist to using this category. */
        const productsLenght = await ProductModel.countDocuments({categoryId:new mongoose.Types.ObjectId(categoryId)});
        if(productsLenght > 0){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_MESSAGES.CATEGORY.DELETE_CATEGORY_WITH_PRODUCTS.replace("{count}",productsLenght.toStrinG()));
        }
        /** Note: Delete Category document. */
        await category.deleteOne();
        return true;
    };

}

export default CategoryServices;